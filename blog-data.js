const blogPosts = [
    {
        id: 1,
        title: "Chasing Shadows in the Congo Basin",
        date: "2025-01-05",
        excerpt: "Searching for Mokele Mbembe requires patience and high-res satellite imagery. Here is my first devlog.",
        image: "https://picsum.photos/seed/1/800/600",
        url: "post.html?id=1"
    },
    {
        id: 2,
        title: "My First Responsive Lab Notebook",
        date: "2025-01-10",
        excerpt: "How I built a mobile-first digital notebook for fieldwork in the jungle using simple CSS.",
        image: "https://picsum.photos/seed/2/800/600",
        url: "post.html?id=2"
    },
    {
        id: 3,
        title: "5 Books That Changed How I Think About AI",
        date: "2025-01-15",
        excerpt: "From 'Godel, Escher, Bach' to 'Superintelligence', these classics shaped my research goals.",
        image: "https://picsum.photos/seed/3/800/600",
        url: "post.html?id=3"
    },
    {
        id: 4,
        title: "From Myth to Model",
        date: "2025-01-20",
        excerpt: "Using CNNs to analyze blurry footage from the Likouala swamp. Is it a log or a legend?",
        image: "https://picsum.photos/seed/4/800/600",
        url: "post.html?id=4"
    },
    {
        id: 5,
        title: "Linear Algebra: The Hidden Heart of the Jungle",
        date: "2025-01-25",
        excerpt: "Visualizing rainforest density using matrix decompositions. Math is everywhere.",
        image: "https://picsum.photos/seed/5/800/600",
        url: "post.html?id=5"
    },
    {
        id: 6,
        title: "Working with Low Bandwidth",
        date: "2025-02-01",
        excerpt: "Optimizing my dev environment for the limited connectivity in Brazzaville.",
        image: "https://picsum.photos/seed/6/800/600",
        url: "post.html?id=6"
    },
    {
        id: 7,
        title: "The Ethics of AI in Conservation",
        date: "2025-02-05",
        excerpt: "Balancing surveillance and privacy when deploying camera traps for rare species.",
        image: "https://picsum.photos/seed/7/800/600",
        url: "post.html?id=7"
    },
    {
        id: 8,
        title: "Building a Better Solar Charger",
        date: "2025-02-10",
        excerpt: "My side project: keeping my laptop alive during 3-day treks into the deep forest.",
        image: "https://picsum.photos/seed/8/800/600",
        url: "post.html?id=8"
    },
    {
        id: 9,
        title: "Python for Paleontology",
        date: "2025-02-15",
        excerpt: "Scripting the reconstruction of sauropod skeletons from fragmented 3D scans.",
        image: "https://picsum.photos/seed/9/800/600",
        url: "post.html?id=9"
    },
    {
        id: 10,
        title: "Reflecting on my First Year of ML",
        date: "2025-02-20",
        excerpt: "What I learned about gradient descent while navigating the actual steep slopes of the Congo.",
        image: "https://picsum.photos/seed/10/800/600",
        url: "post.html?id=10"
    },
    {
        id: 11,
        title: "Neural Networks in the Wild",
        date: "2025-03-01",
        excerpt: "Testing model inference on edge devices in high humidity. Harder than it looks.",
        image: "https://picsum.photos/seed/11/800/600",
        url: "post.html?id=11"
    },
    {
        id: 12,
        title: "The Sound of the Forest",
        date: "2025-03-05",
        excerpt: "Acoustic monitoring and the Fourier transform. Identifying hidden birds with code.",
        image: "https://picsum.photos/seed/12/800/600",
        url: "post.html?id=12"
    },
    {
        id: 13,
        title: "Deep Learning for River Deltas",
        date: "2025-03-10",
        excerpt: "Predicting erosion patterns in the Congo River using LSTMs.",
        image: "https://picsum.photos/seed/13/800/600",
        url: "post.html?id=13"
    },
    {
        id: 14,
        title: "My Setup in Brazzaville",
        date: "2025-03-15",
        excerpt: "Minimalism, powerful GPUs, and a lot of coffee from the local market.",
        image: "https://picsum.photos/seed/14/800/600",
        url: "post.html?id=14"
    },
    {
        id: 15,
        title: "The Mystery of Tele Lake",
        date: "2025-03-20",
        excerpt: "Why this isolated lake is the center of so many local legends and my research.",
        image: "https://picsum.photos/seed/15/800/600",
        url: "post.html?id=15"
    },
    {
        id: 16,
        title: "Graph Theory and Social Connections",
        date: "2025-03-25",
        excerpt: "Mapping oral histories and myth propagation across different villages.",
        image: "https://picsum.photos/seed/16/800/600",
        url: "post.html?id=16"
    },
    {
        id: 17,
        title: "Reinforcement Learning for Game Dev",
        date: "2025-04-01",
        excerpt: "Teaching an agent to traverse a voxelized version of the Congo rainforest.",
        image: "https://picsum.photos/seed/17/800/600",
        url: "post.html?id=17"
    },
    {
        id: 18,
        title: "Docker in the Tropics",
        date: "2025-04-05",
        excerpt: "The struggle of pulling 2GB images on a 3G connection. Tips for offline dev.",
        image: "https://picsum.photos/seed/18/800/600",
        url: "post.html?id=18"
    },
    {
        id: 19,
        title: "The Mathematics of Camouflage",
        date: "2025-04-10",
        excerpt: "How animals hide and how CV algorithms try to see through the noise.",
        image: "https://picsum.photos/seed/19/800/600",
        url: "post.html?id=19"
    },
    {
        id: 20,
        title: "My 2026 Vision for Congo Tech",
        date: "2025-04-15",
        excerpt: "How we can build a world-class AI research hub in Central Africa.",
        image: "https://picsum.photos/seed/20/800/600",
        url: "post.html?id=20"
    },
    {
        id: 21,
        title: "Predicting the Rainy Season",
        date: "2025-05-01",
        excerpt: "Using historical weather data and GRUs to anticipate the next big floods.",
        image: "https://picsum.photos/seed/21/800/600",
        url: "post.html?id=21"
    },
    {
        id: 22,
        title: "Beyond the Screen",
        date: "2025-05-05",
        excerpt: "What I do when I'm not coding: exploring the markets and riverbanks.",
        image: "https://picsum.photos/seed/22/800/600",
        url: "post.html?id=22"
    },
    {
        id: 23,
        title: "Edge Computing for Poaching Prevention",
        date: "2025-05-10",
        excerpt: "Deploying tinyML models on solar-powered sensors in national parks.",
        image: "https://picsum.photos/seed/23/800/600",
        url: "post.html?id=23"
    },
    {
        id: 24,
        title: "The Beauty of Sparse Matrices",
        date: "2025-05-15",
        excerpt: "Why efficient storage is key when your data is as varied as jungle flora.",
        image: "https://picsum.photos/seed/24/800/600",
        url: "post.html?id=24"
    },
    {
        id: 25,
        title: "Lessons from the Elders",
        date: "2025-05-20",
        excerpt: "Conversations about the past and the 'great animals' that once roamed the area.",
        image: "https://picsum.photos/seed/25/800/600",
        url: "post.html?id=25"
    },
    {
        id: 26,
        title: "Optimizing Shaders for Mobile Blog",
        date: "2025-06-01",
        excerpt: "Making the Matrix effect run smoothly on every visitor's device.",
        image: "https://picsum.photos/seed/26/800/600",
        url: "post.html?id=26"
    },
    {
        id: 27,
        title: "Data Annotation in the Field",
        date: "2025-06-05",
        excerpt: "Drawing bounding boxes on a tablet under the shade of a Kapok tree.",
        image: "https://picsum.photos/seed/27/800/600",
        url: "post.html?id=27"
    },
    {
        id: 28,
        title: "The Architecture of a Legend",
        date: "2025-06-10",
        excerpt: "Analyzing footprints with Gaussian Processes. Scientific evidence or wishful thinking?",
        image: "https://picsum.photos/seed/28/800/600",
        url: "post.html?id=28"
    },
    {
        id: 29,
        title: "Congo's Role in Global Tech",
        date: "2025-06-15",
        excerpt: "The mining of rare minerals and the dream of building the future locally.",
        image: "https://picsum.photos/seed/29/800/600",
        url: "post.html?id=29"
    },
    {
        id: 30,
        title: "Becoming a Self-Taught Expert",
        date: "2025-06-20",
        excerpt: "The roadmap I'm following to reach my 2026 AI goals from scratch.",
        image: "https://picsum.photos/seed/30/800/600",
        url: "post.html?id=30"
    },
    {
        id: 31,
        title: "Simulating Jungle Growth",
        date: "2025-07-01",
        excerpt: "Using L-systems to create procedural vegetation for my ML training environments.",
        image: "https://picsum.photos/seed/31/800/600",
        url: "post.html?id=31"
    },
    {
        id: 32,
        title: "The Digital Divide",
        date: "2025-07-05",
        excerpt: "Real stories about the challenges and triumphs of tech in Central Africa.",
        image: "https://picsum.photos/seed/32/800/600",
        url: "post.html?id=32"
    },
    {
        id: 33,
        title: "NLP for Local Languages",
        date: "2025-07-10",
        excerpt: "Building translation models for Lingala and Monokutuba using few-shot learning.",
        image: "https://picsum.photos/seed/33/800/600",
        url: "post.html?id=33"
    },
    {
        id: 34,
        title: "Exploring the Sangha River",
        date: "2025-07-15",
        excerpt: "A photo essay of my latest expedition to the north of the country.",
        image: "https://picsum.photos/seed/34/800/600",
        url: "post.html?id=34"
    },
    {
        id: 35,
        title: "Why Mokele Mbembe Matters",
        date: "2025-07-20",
        excerpt: "It's more than a dinosaur; it's about the preservation of our pristine wetlands.",
        image: "https://picsum.photos/seed/35/800/600",
        url: "post.html?id=35"
    },
    {
        id: 36,
        title: "Generative Art from Satellite Data",
        date: "2025-08-01",
        excerpt: "Turning geographic coordinates into beautiful abstract portraits of the basin.",
        image: "https://picsum.photos/seed/36/800/600",
        url: "post.html?id=36"
    },
    {
        id: 37,
        title: "Offline Documentation is King",
        date: "2025-08-05",
        excerpt: "My favorite tools for keeping PyTorch and NumPy docs accessible without Wi-Fi.",
        image: "https://picsum.photos/seed/37/800/600",
        url: "post.html?id=37"
    },
    {
        id: 38,
        title: "The Future of Remote Work",
        date: "2025-08-10",
        excerpt: "Can you really work for Big Tech from the heart of the Congo? I say yes.",
        image: "https://picsum.photos/seed/38/800/600",
        url: "post.html?id=38"
    },
    {
        id: 39,
        title: "Binary Trees and Baobabs",
        date: "2025-08-15",
        excerpt: "Finding algorithmic inspiration in the branching patterns of ancient trees.",
        image: "https://picsum.photos/seed/39/800/600",
        url: "post.html?id=39"
    },
    {
        id: 40,
        title: "My GitHub Journey",
        date: "2025-08-20",
        excerpt: "How open source opened doors for a kid from Republic of Congo.",
        image: "https://picsum.photos/seed/40/800/600",
        url: "post.html?id=40"
    },
    {
        id: 41,
        title: "Robotics in Agriculture",
        date: "2025-09-01",
        excerpt: "Simple automation ideas to help small-scale farmers in my village.",
        image: "https://picsum.photos/seed/41/800/600",
        url: "post.html?id=41"
    },
    {
        id: 42,
        title: "The Quiet Before the Storm",
        date: "2025-09-05",
        excerpt: "A deep dive into the calm biodiversity of the Odzala-Kokoua National Park.",
        image: "https://picsum.photos/seed/42/800/600",
        url: "post.html?id=42"
    },
    {
        id: 43,
        title: "Low-Power ML on Microcontrollers",
        date: "2025-09-10",
        excerpt: "Using Arduino and TensorFlow Lite for animal detection in the bush.",
        image: "https://picsum.photos/seed/43/800/600",
        url: "post.html?id=43"
    },
    {
        id: 44,
        title: "Mapping the Unmapped",
        date: "2025-09-15",
        excerpt: "Using OpenStreetMap to improve navigation for remote communities.",
        image: "https://picsum.photos/seed/44/800/600",
        url: "post.html?id=44"
    },
    {
        id: 45,
        title: "The Allure of the Unknown",
        date: "2025-09-20",
        excerpt: "Why humans are driven to find what's hidden, and how AI helps.",
        image: "https://picsum.photos/seed/45/800/600",
        url: "post.html?id=45"
    },
    {
        id: 46,
        title: "Visualizing Climate Change",
        date: "2025-10-01",
        excerpt: "A data scientist's look at the shifting rains in Central Africa.",
        image: "https://picsum.photos/seed/46/800/600",
        url: "post.html?id=46"
    },
    {
        id: 47,
        title: "The Tech Scene in Kinshasa",
        date: "2025-10-05",
        excerpt: "Crossing the river to see the vibrant startup culture in our neighbor city.",
        image: "https://picsum.photos/seed/47/800/600",
        url: "post.html?id=47"
    },
    {
        id: 48,
        title: "Reinforcement Learning with Actual Maps",
        date: "2025-10-10",
        excerpt: "Training agents for logistical planning in areas with no paved roads.",
        image: "https://picsum.photos/seed/48/800/600",
        url: "post.html?id=48"
    },
    {
        id: 49,
        title: "Coding Under a Tin Roof",
        date: "2025-10-15",
        excerpt: "The rhythmic white noise of rain as a backdrop for debugging.",
        image: "https://picsum.photos/seed/49/800/600",
        url: "post.html?id=49"
    },
    {
        id: 50,
        title: "Final Countdown to 2026",
        date: "2025-10-20",
        excerpt: "Assessing my progress and gearing up for my final push toward expertise.",
        image: "https://picsum.photos/seed/50/800/600",
        url: "post.html?id=50"
    }
];

// Content for full articles (mapping by ID)
const blogContents = {
    1: "Full content for Chasing Shadows in the Congo Basin... Searching for Mokele Mbembe requires patience and high-res satellite imagery. I've spent weeks analyzing pixel shifts in the Likouala region. Is it a dinosaur or just a trick of the light?",
    2: "Full content for My First Responsive Lab Notebook... Building a mobile-first digital notebook for fieldwork in the jungle was a challenge. High humidity means paper gets soggy, so a rugged tablet is a must. Here's how I optimized the CSS for sunlight readability.",
    // ... and so on. I will provide a few more for demonstration and assume the rest can be generated or have placeholders.
    3: "Full content for 5 Books That Changed How I Think About AI... These books are essential for anyone starting in ML. They provide the philosophical and technical grounding needed to understand the future.",
    4: "Full content for From Myth to Model... CNNs are powerful tools for pattern recognition. I'm applying them to local legends to see if there's any biological signal hiding in the noise of rural sightings.",
    50: "Full content for Final Countdown to 2026... I'm almost there. The journey from a village in Congo to the cutting edge of AI has been long, but the destination is in sight."
};
