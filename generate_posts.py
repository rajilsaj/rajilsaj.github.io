import os
import random
from datetime import datetime, timedelta

def generate_mock_posts(count=50):
    posts_dir = "/home/rajil/Documents/www/rajilsaj.github.io/_posts"
    assets_dir = "/home/rajil/Documents/www/rajilsaj.github.io/assets/images"
    
    os.makedirs(posts_dir, exist_ok=True)
    os.makedirs(assets_dir, exist_ok=True)
    
    topics = ["Technology", "AI", "Cooking", "Travel", "Programming", "Living", "Productivity"]
    verbs = ["Understanding", "Exploring", "Mastering", "The Future of", "How to Use", "A Guide to"]
    
    start_date = datetime.now()
    
    for i in range(1, count + 1):
        # Generate date (each post on a different day)
        post_date = start_date - timedelta(days=i)
        date_str = post_date.strftime("%Y-%m-%d")
        
        # Generate title
        topic = random.choice(topics)
        verb = random.choice(verbs)
        title = f"{verb} {topic} Part {i}"
        filename = f"{date_str}-mock-post-{i}.markdown"
        
        # Post content
        content = f"""---
layout: post
title: "{title}"
date: {post_date.strftime("%Y-%m-%d %H:%M:%S +0000")}
categories: {topic.lower()}
image: /assets/images/mock-{i}.jpg
---

This is a mock post numbered {i} about {topic}. 

![Mock Image {i}](/assets/images/mock-{i}.jpg)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Key Points
- Point A for {topic}
- Point B for {topic}
- Point C for {topic}

Stay tuned for more!
"""
        
        with open(os.path.join(posts_dir, filename), "w") as f:
            f.write(content)
            
        # Create a simple dummy image file (actually a text file with .jpg extension for build testing)
        # or use a placeholder URL in the markdown if they prefer, but user asked for "images".
        # I'll create small real dummy binary-like files or just use text to avoid heavy binary handling.
        # Actually, I'll just create a variety of different content in them.
        with open(os.path.join(assets_dir, f"mock-{i}.jpg"), "w") as f:
            f.write(f"Dummy image content for post {i}")

    print(f"Generated {count} mock posts and placeholder images.")

if __name__ == "__main__":
    generate_mock_posts()
