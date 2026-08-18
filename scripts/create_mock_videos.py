"""
create_mock_videos.py

Generate short H.264 MP4 clips from still images (slow dolly-zoom effect).

OpenH264 DLL placement (Windows):
  OpenCV's 'avc1' encoder requires  openh264-1.8.0-win64.dll  to be discoverable
  at runtime.  The copy shipped with this kit lives in  scripts/  (same directory
  as this script).  If OpenCV cannot find it, copy the DLL to your working
  directory or add scripts/ to your PATH before running this script.
"""

import argparse
import os
import sys

try:
    import cv2
    import numpy as np
    from PIL import Image
except ImportError as e:
    print(f"Required package not installed. Run:  pip install opencv-python Pillow  ({e})", file=sys.stderr)
    sys.exit(1)

from _utils import crop_cover_16_9, split_spec

W, H = 1280, 720


def ensure_openh264_dll():
    """On Windows, make sure the OpenH264 DLL in this script's directory is on PATH."""
    if sys.platform != "win32":
        return
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dll_name = "openh264-1.8.0-win64.dll"
    dll_path = os.path.join(script_dir, dll_name)
    if os.path.exists(dll_path):
        os.environ["PATH"] = script_dir + os.pathsep + os.environ.get("PATH", "")



def create_dolly_zoom_video(img_path, dest_path, duration=3, fps=24, zoom_range=(1.0, 1.08)):
    if not os.path.exists(img_path):
        print(f"[error] Source image not found: {img_path}", file=sys.stderr)
        return False

    img = crop_cover_16_9(Image.open(img_path), W, H)
    fourcc = cv2.VideoWriter_fourcc(*"avc1")
    os.makedirs(os.path.dirname(dest_path) or ".", exist_ok=True)
    out = cv2.VideoWriter(dest_path, fourcc, fps, (W, H))

    total_frames = duration * fps
    for i in range(total_frames):
        t = i / float(total_frames - 1)
        ease_t = t * t * (3.0 - 2.0 * t)
        scale = zoom_range[0] + (zoom_range[1] - zoom_range[0]) * ease_t

        zoomed = img.resize((int(W * scale), int(H * scale)), Image.Resampling.LANCZOS)
        left = (zoomed.width - W) // 2
        top = (zoomed.height - H) // 2
        cropped = zoomed.crop((left, top, left + W, top + H))

        frame_bgr = cv2.cvtColor(np.array(cropped), cv2.COLOR_RGB2BGR)
        out.write(frame_bgr)

    out.release()
    print(f"[ok] {dest_path}  ({duration}s @ {fps}fps, zoom {zoom_range})")
    return True


def main():
    ensure_openh264_dll()

    parser = argparse.ArgumentParser(
        description="Generate short H.264 MP4 clips from still images (dolly-zoom effect).",
    )
    parser.add_argument(
        "tasks",
        nargs="*",
        help="One or more  src:dest  pairs  e.g.  assets/hero.jpg:assets/cta.mp4. "
             "You may append ':duration=5,zoom=1.0:1.06' for custom settings.",
    )
    parser.add_argument("--duration", "-d", type=int, default=3, help="Default clip duration in seconds (default: 3)")
    parser.add_argument("--fps", type=int, default=24, help="Frames per second (default: 24)")
    parser.add_argument(
        "--zoom",
        default="1.0:1.06",
        help="Default zoom range as 'start:end' (default: '1.0:1.06')",
    )
    args = parser.parse_args()

    if not args.tasks:
        parser.print_help()
        sys.exit(0)

    zoom_start, zoom_end = (float(x) for x in args.zoom.split(":"))
    default_zoom = (zoom_start, zoom_end)

    for spec in args.tasks:
        parts = split_spec(spec)
        if len(parts) < 2:
            print(f"[skip] '{spec}' — expected  src:dest[:dur=z,zoom=a:b]", file=sys.stderr)
            continue

        src = parts[0]
        dest = parts[1]
        duration = args.duration
        zoom = default_zoom

        for opt in parts[2:]:
            if opt.startswith("duration="):
                duration = int(opt.split("=", 1)[1])
            elif opt.startswith("dur="):
                duration = int(opt.split("=", 1)[1])
            elif opt.startswith("zoom="):
                z = opt.split("=", 1)[1]
                zoom = tuple(float(x) for x in z.split(":"))

        create_dolly_zoom_video(src, dest, duration=duration, fps=args.fps, zoom_range=zoom)


if __name__ == "__main__":
    main()
