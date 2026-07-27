#!/usr/bin/env python3
"""
refine_assets.py — AI Background Removal & Canvas Sequence Refinement Tool
Uses rembg to create transparent PNG cutouts (hero product, cards) and build
clean JPEG/PNG scroll sequences without background box artifacts.

Dependencies:
    pip install rembg pillow opencv-python

Usage:
    python scripts/refine_assets.py --hero path/to/hero.png --out assets/product-cut.png
    python scripts/refine_assets.py --sequence assets/seq --count 93
"""

import os
import sys
import argparse
import math
from PIL import Image, ImageDraw, ImageEnhance

try:
    import rembg
    HAS_REMBG = True
except ImportError:
    HAS_REMBG = False

def remove_bg(input_path, output_path):
    if not HAS_REMBG:
        print("ERROR: rembg package is not installed. Run: pip install rembg pillow")
        sys.exit(1)
    
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found: {input_path}")
        return False
    
    print(f"Removing background from {input_path} via rembg...")
    with open(input_path, "rb") as f:
        img_bytes = f.read()
    
    out_bytes = rembg.remove(img_bytes)
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(out_bytes)
    
    print(f"✓ Transparent PNG saved to: {output_path}")
    return True

def build_sequence_from_cutout(cutout_path, seq_dir, frame_count=93, width=1280, height=720):
    if not os.path.exists(cutout_path):
        print(f"ERROR: Cutout image not found: {cutout_path}")
        return False
    
    print(f"Building {frame_count} sequence frames in {seq_dir} from {cutout_path}...")
    os.makedirs(seq_dir, exist_ok=True)
    
    hero_cutout = Image.open(cutout_path).convert("RGBA")
    cw_orig, ch_orig = hero_cutout.size
    
    for i in range(frame_count):
        progress = i / max(1, frame_count - 1)
        
        # Color transitions per scroll beat
        if progress < 0.25:
            p_sub = progress / 0.25
            r_val = int(11 + (33 - 11) * p_sub)
            g_val = int(8 + (22 - 8) * p_sub)
            b_val = int(5 + (15 - 5) * p_sub)
            frame_bg = Image.new("RGB", (width, height), (r_val, g_val, b_val))
            
            scale = 0.55 + 0.12 * p_sub
            nw = int(cw_orig * scale * (height / ch_orig) * 0.7)
            nh = int(height * scale * 0.7)
            resized = hero_cutout.resize((nw, nh), Image.Resampling.LANCZOS)
            
            r, g, b, alpha = resized.split()
            alpha = alpha.point(lambda p: int(p * (0.2 + 0.7 * p_sub)))
            bottle_dimmed = Image.merge("RGBA", (r, g, b, alpha))
            frame_bg.paste(bottle_dimmed, ((width - nw) // 2, (height - nh) // 2), mask=bottle_dimmed)
            
        elif progress < 0.50:
            p_sub = (progress - 0.25) / 0.25
            r_val = int(33 + (70 - 33) * p_sub)
            g_val = int(22 + (45 - 22) * p_sub)
            b_val = int(15 + (28 - 15) * p_sub)
            frame_bg = Image.new("RGB", (width, height), (r_val, g_val, b_val))
            
            scale = 0.67 + 0.13 * p_sub
            nw = int(cw_orig * scale * (height / ch_orig) * 0.7)
            nh = int(height * scale * 0.7)
            resized = hero_cutout.resize((nw, nh), Image.Resampling.LANCZOS)
            frame_bg.paste(resized, ((width - nw) // 2, (height - nh) // 2), mask=resized)
            
        elif progress < 0.75:
            p_sub = (progress - 0.50) / 0.25
            r_val = int(70 + (160 - 70) * p_sub)
            g_val = int(45 + (110 - 45) * p_sub)
            b_val = int(28 + (65 - 28) * p_sub)
            frame_bg = Image.new("RGB", (width, height), (r_val, g_val, b_val))
            
            scale = 0.80 + 0.12 * p_sub
            nw = int(cw_orig * scale * (height / ch_orig) * 0.7)
            nh = int(height * scale * 0.7)
            resized = hero_cutout.resize((nw, nh), Image.Resampling.LANCZOS)
            frame_bg.paste(resized, ((width - nw) // 2, (height - nh) // 2), mask=resized)
            
        else:
            p_sub = (progress - 0.75) / 0.25
            r_val = int(160 + (251 - 160) * p_sub)
            g_val = int(110 + (248 - 110) * p_sub)
            b_val = int(65 + (242 - 65) * p_sub)
            frame_bg = Image.new("RGB", (width, height), (r_val, g_val, b_val))
            
            scale = 0.92 + 0.08 * math.sin(p_sub * math.pi / 2)
            nw = int(cw_orig * scale * (height / ch_orig) * 0.7)
            nh = int(height * scale * 0.7)
            resized = hero_cutout.resize((nw, nh), Image.Resampling.LANCZOS)
            frame_bg.paste(resized, ((width - nw) // 2, (height - nh) // 2), mask=resized)

        frame_path = os.path.join(seq_dir, f"f{i:03d}.jpg")
        frame_bg.save(frame_path, "JPEG", quality=85)
        
    print(f"✓ Generated {frame_count} sequence frames at: {seq_dir}")
    return True

def main():
    parser = argparse.ArgumentParser(description="AI Background Removal & Canvas Sequence Refinement Tool")
    parser.add_argument("--input", "-i", help="Input image path for background removal")
    parser.add_argument("--output", "-o", help="Output path for transparent PNG")
    parser.add_argument("--cutout", "-c", help="Cutout PNG image for sequence generation")
    parser.add_argument("--seq-dir", "-s", default="assets/seq", help="Target sequence directory")
    parser.add_argument("--count", default=93, type=int, help="Number of frames to generate")

    args = parser.parse_args()

    if args.input and args.output:
        remove_bg(args.input, args.output)
    
    if args.cutout:
        build_sequence_from_cutout(args.cutout, args.seq_dir, frame_count=args.count)

if __name__ == "__main__":
    main()
