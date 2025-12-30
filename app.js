/* ============================================
   CALM COUNTDOWN - app.js
   Main application logic
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    
    const TOTAL_DAYS = 44;
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + TOTAL_DAYS);
    targetDate.setHours(18, 0, 0, 0);

    // ============================================
    // SCENE VARIATIONS - Random on each refresh
    // ============================================
    
    const sceneVariations = [
        {
            name: 'Mountain Dawn',
            icon: '🏔️',
            fogColor: { r: 0.08, g: 0.1, b: 0.15 },
            clearColor: { r: 0.05, g: 0.08, b: 0.12, a: 1 },
            ambientColor: { r: 0.15, g: 0.12, b: 0.18 },
            sunColor: { r: 1, g: 0.85, b: 0.7 }
        },
        {
            name: 'Ocean Calm',
            icon: '🌊',
            fogColor: { r: 0.05, g: 0.1, b: 0.15 },
            clearColor: { r: 0.03, g: 0.08, b: 0.14, a: 1 },
            ambientColor: { r: 0.1, g: 0.15, b: 0.2 },
            sunColor: { r: 0.9, g: 0.95, b: 1 }
        },
        {
            name: 'Forest Mist',
            icon: '🌲',
            fogColor: { r: 0.06, g: 0.12, b: 0.08 },
            clearColor: { r: 0.04, g: 0.1, b: 0.06, a: 1 },
            ambientColor: { r: 0.1, g: 0.18, b: 0.12 },
            sunColor: { r: 0.95, g: 1, b: 0.9 }
        },
        {
            name: 'Starry Night',
            icon: '✨',
            fogColor: { r: 0.02, g: 0.03, b: 0.08 },
            clearColor: { r: 0.01, g: 0.02, b: 0.06, a: 1 },
            ambientColor: { r: 0.08, g: 0.08, b: 0.15 },
            sunColor: { r: 0.7, g: 0.75, b: 1 }
        }
    ];
    
    let currentSceneIndex = Math.floor(Math.random() * sceneVariations.length);

    // ============================================
    // EXPANDED QUOTES - More variety
    // ============================================
    
    const quotes = [
        "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
        "You don't have to see the whole staircase, just take the first step.",
        "Within you there is a stillness and a sanctuary to which you can retreat at any time.",
        "The wound is the place where the light enters you.",
        "Be patient with yourself. You are growing stronger every day.",
        "Let go of who you think you're supposed to be; embrace who you are.",
        "Your calm mind is the ultimate weapon against your challenges.",
        "The best time to plant a tree was twenty years ago. The second best time is now.",
        "Peace comes from within. Do not seek it without.",
        "The quieter you become, the more you can hear.",
        "New beginnings are often disguised as painful endings.",
        "Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.",
        "Courage is not the absence of fear, but rather the judgment that something else is more important.",
        "In the middle of difficulty lies opportunity.",
        "When I let go of what I am, I become what I might be.",
        "Life begins at the end of your comfort zone.",
        "Surrender to what is. Let go of what was. Have faith in what will be.",
        "Not all those who wander are lost.",
        "A tree that is unbending is easily broken. Bend and flow.",
        "The present moment is the only moment available to us, and it is the door to all moments.",
        "You are never too old to set another goal or to dream a new dream.",
        "Where there is no struggle, there is no strength.",
        "Every moment is a fresh beginning.",
        "The only journey is the one within.",
        "You are allowed to be both a masterpiece and a work in progress simultaneously.",
        "Sometimes the smallest step in the right direction ends up being the biggest step of your life.",
        "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
        "Almost everything will work again if you unplug it for a few minutes, including you.",
        "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
        "Each morning we are born again. What we do today is what matters most.",
        "Nature does not hurry, yet everything is accomplished.",
        "If you want to fly, you have to give up the things that weigh you down."
    ];

    // ============================================
    // MUSIC VARIATIONS - Different ambient sounds
    // ============================================
    
    const musicVariants = [
        { name: "Peaceful Piano", baseFreq: 65.41, chordType: "major", tempo: 0.06, style: "piano" },
        { name: "Ocean Waves", baseFreq: 55.00, chordType: "sus4", tempo: 0.04, style: "ocean" },
        { name: "Forest Dawn", baseFreq: 73.42, chordType: "minor", tempo: 0.08, style: "forest" },
        { name: "Zen Garden", baseFreq: 49.00, chordType: "fifth", tempo: 0.03, style: "zen" },
        { name: "Starlight", baseFreq: 82.41, chordType: "major", tempo: 0.05, style: "stars" },
        { name: "Misty Morning", baseFreq: 61.74, chordType: "sus4", tempo: 0.07, style: "mist" }
    ];

    let currentMusicIndex = Math.floor(Math.random() * musicVariants.length);

    // ============================================
    // MOTIVATIONAL MESSAGES
    // ============================================
    
    const motivationalMessages = [
        { icon: "🌱", text: "Every day is progress" },
        { icon: "✨", text: "You're doing great" },
        { icon: "🌿", text: "Growth takes time" },
        { icon: "💫", text: "Trust the process" },
        { icon: "🌸", text: "Bloom at your own pace" },
        { icon: "🌙", text: "Rest is part of the journey" },
        { icon: "🌅", text: "New day, new strength" },
        { icon: "🦋", text: "Transformation in progress" }
    ];

    // ============================================
    // DOM ELEMENTS
    // ============================================
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');
    const completeEl = document.getElementById('complete');
    const quoteText = document.getElementById('quoteText');
    const progressRing = document.getElementById('progressRing');
    const progressPercent = document.getElementById('progressPercent');
    const dayIndicator = document.getElementById('dayIndicator');
    const soundToggle = document.getElementById('soundToggle');
    const loadingScreen = document.getElementById('loadingScreen');
    const musicIndicator = document.getElementById('musicIndicator');
    const sceneIndicator = document.getElementById('sceneIndicator');
    const motivationBadge = document.getElementById('motivationBadge');

    // ============================================
    // INITIAL SETUP
    // ============================================
    
    // Set random quote
    quoteText.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    
    // Set random motivation
    const motivation = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    if (motivationBadge) {
        motivationBadge.innerHTML = `<span class="motivation-badge-icon">${motivation.icon}</span>${motivation.text}`;
    }
    
    // Set scene indicator
    const currentScene = sceneVariations[currentSceneIndex];
    if (sceneIndicator) {
        sceneIndicator.innerHTML = `${currentScene.icon} ${currentScene.name}`;
    }

    // ============================================
    // AUDIO SYSTEM
    // ============================================
    
    let audioContext = null;
    let isPlaying = false;
    let masterGain = null;
    let activeOscillators = [];
    let activeGains = [];

    function getChordFrequencies(baseFreq, chordType) {
        const ratios = {
            major: [1, 1.25, 1.5, 2],
            minor: [1, 1.2, 1.5, 2],
            sus4: [1, 1.333, 1.5, 2],
            fifth: [1, 1.5, 2, 3]
        };
        return ratios[chordType].map(r => baseFreq * r);
    }

    function initAudio() {
        if (audioContext) return;
        
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = audioContext.createGain();
            masterGain.gain.value = 0;
            masterGain.connect(audioContext.destination);
            
            createMusicVariant(currentMusicIndex);
            createNatureSounds();
        } catch (e) {
            console.log('Audio not available');
        }
    }

    function createMusicVariant(index) {
        const variant = musicVariants[index];
        const frequencies = getChordFrequencies(variant.baseFreq, variant.chordType);
        const volumes = [0.06, 0.04, 0.03, 0.02];

        // Clean up previous oscillators
        activeOscillators.forEach(osc => {
            try { osc.stop(); } catch(e) {}
        });
        activeOscillators = [];
        activeGains = [];

        frequencies.forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            filter.type = 'lowpass';
            filter.frequency.value = 250 + i * 40;
            filter.Q.value = 0.3;
            
            gain.gain.value = volumes[i];
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            
            osc.start();
            activeOscillators.push(osc);
            activeGains.push({ gain, baseVol: volumes[i], phase: i * 1.5 });
        });

        // LFO for gentle modulation
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.frequency.value = variant.tempo;
        lfoGain.gain.value = 0.2;
        lfo.connect(lfoGain);
        
        activeGains.forEach(({ gain }) => {
            lfoGain.connect(gain.gain);
        });
        
        lfo.start();
        activeOscillators.push(lfo);

        musicIndicator.textContent = `♪ ${variant.name}`;
    }

    function createNatureSounds() {
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        
        const windFilter = audioContext.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.value = 250;
        windFilter.Q.value = 0.4;
        
        const windGain = audioContext.createGain();
        windGain.gain.value = 0.012;
        
        whiteNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(masterGain);
        
        whiteNoise.start();

        // Modulate wind
        function modulateWind() {
            if (!isPlaying) {
                requestAnimationFrame(modulateWind);
                return;
            }
            const time = Date.now() / 1000;
            windFilter.frequency.value = 200 + Math.sin(time * 0.2) * 100;
            windGain.gain.value = 0.008 + Math.sin(time * 0.15) * 0.006;
            requestAnimationFrame(modulateWind);
        }
        modulateWind();

        // Occasional nature sounds
        setInterval(() => {
            if (!isPlaying || !audioContext || Math.random() > 0.2) return;
            createBirdSound();
        }, 6000);
    }

    function createBirdSound() {
        const birdOsc = audioContext.createOscillator();
        const birdGain = audioContext.createGain();
        const birdFilter = audioContext.createBiquadFilter();
        
        birdOsc.type = 'sine';
        const baseFreq = 1000 + Math.random() * 600;
        birdOsc.frequency.value = baseFreq;
        
        birdFilter.type = 'bandpass';
        birdFilter.frequency.value = baseFreq;
        birdFilter.Q.value = 4;
        
        birdGain.gain.value = 0;
        
        birdOsc.connect(birdFilter);
        birdFilter.connect(birdGain);
        birdGain.connect(masterGain);
        
        const now = audioContext.currentTime;
        birdGain.gain.setValueAtTime(0, now);
        birdGain.gain.linearRampToValueAtTime(0.015, now + 0.05);
        birdOsc.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + 0.1);
        birdGain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        birdOsc.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 0.35);
        birdGain.gain.linearRampToValueAtTime(0, now + 0.5);
        
        birdOsc.start(now);
        birdOsc.stop(now + 0.6);
    }

    function switchMusic() {
        if (!audioContext) return;
        currentMusicIndex = (currentMusicIndex + 1) % musicVariants.length;
        createMusicVariant(currentMusicIndex);
        
        musicIndicator.classList.add('visible');
        setTimeout(() => musicIndicator.classList.remove('visible'), 2500);
    }

    function toggleSound() {
        if (!audioContext) initAudio();
        
        isPlaying = !isPlaying;
        soundToggle.textContent = isPlaying ? '🔊' : '🔇';
        
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        if (masterGain) {
            masterGain.gain.setTargetAtTime(isPlaying ? 1 : 0, audioContext.currentTime, 0.5);
        }

        if (isPlaying) {
            musicIndicator.classList.add('visible');
            setTimeout(() => musicIndicator.classList.remove('visible'), 2500);
        }
    }

    soundToggle.addEventListener('click', toggleSound);
    soundToggle.addEventListener('dblclick', switchMusic);
    
    if (sceneIndicator) {
        sceneIndicator.addEventListener('click', () => {
            currentSceneIndex = (currentSceneIndex + 1) % sceneVariations.length;
            const scene = sceneVariations[currentSceneIndex];
            sceneIndicator.innerHTML = `${scene.icon} ${scene.name}`;
            applySceneColors(scene);
        });
    }

    // ============================================
    // PROGRESS & COUNTDOWN
    // ============================================
    
    let currentGrowth = 0;
    let targetGrowth = 0;
    let currentDay = 1;

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    function calculateDayAndProgress() {
        const now = new Date();
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysPassed = Math.floor((now - startDate) / msPerDay);
        
        currentDay = Math.min(Math.max(1, daysPassed + 1), TOTAL_DAYS);
        
        const dayProgress = (now - todayStart) / msPerDay;
        const overallProgress = (currentDay - 1 + dayProgress) / TOTAL_DAYS;
        
        return Math.max(0, Math.min(1, overallProgress));
    }

    function updateProgressRing(progress) {
        if (!progressRing) return;
        
        const circumference = 2 * Math.PI * 70; // r=70
        const offset = circumference * (1 - progress);
        progressRing.style.strokeDashoffset = offset;
        
        if (progressPercent) {
            progressPercent.textContent = `${Math.round(progress * 100)}%`;
        }
        
        if (dayIndicator) {
            dayIndicator.textContent = `Day ${currentDay} of ${TOTAL_DAYS}`;
        }
    }

    function updateCountdown() {
        const now = new Date();
        const remaining = targetDate - now;
        
        const progress = calculateDayAndProgress();
        targetGrowth = progress;
        
        updateProgressRing(progress);

        if (remaining <= 0) {
            countdownEl.classList.add('hidden');
            document.querySelector('.top-section').classList.add('hidden');
            document.querySelector('.quote-container').classList.add('hidden');
            completeEl.classList.add('visible');
            targetGrowth = 1;
            return false;
        }

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = padZero(hours);
        minutesEl.textContent = padZero(minutes);
        secondsEl.textContent = padZero(seconds);

        return true;
    }

    // ============================================
    // 3D SCENE (Babylon.js)
    // ============================================
    
    const canvas = document.getElementById('renderCanvas');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let engine, scene, camera, tree, treeGenerator;
    let particleSystem = null;

    function applySceneColors(sceneConfig) {
        if (!scene) return;
        
        scene.clearColor = new BABYLON.Color4(
            sceneConfig.clearColor.r,
            sceneConfig.clearColor.g,
            sceneConfig.clearColor.b,
            sceneConfig.clearColor.a
        );
        scene.fogColor = new BABYLON.Color3(
            sceneConfig.fogColor.r,
            sceneConfig.fogColor.g,
            sceneConfig.fogColor.b
        );
        scene.ambientColor = new BABYLON.Color3(
            sceneConfig.ambientColor.r,
            sceneConfig.ambientColor.g,
            sceneConfig.ambientColor.b
        );
    }

    function loadBabylon() {
        const script = document.createElement('script');
        script.src = 'https://cdn.babylonjs.com/babylon.js';
        script.onload = function() {
            initScene();
        };
        script.onerror = function() {
            console.log('Babylon.js failed to load, using fallback');
            initFallback();
        };
        document.head.appendChild(script);
    }

    function initScene() {
        try {
            engine = new BABYLON.Engine(canvas, true, { 
                preserveDrawingBuffer: true, 
                stencil: true,
                antialias: true
            });

            scene = new BABYLON.Scene(engine);
            
            // Apply current scene variation
            const sceneConfig = sceneVariations[currentSceneIndex];
            applySceneColors(sceneConfig);
            
            scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
            scene.fogDensity = 0.012;

            camera = new BABYLON.ArcRotateCamera(
                "camera",
                Math.PI / 2,
                Math.PI / 2.6,
                isMobile ? 16 : 12,
                new BABYLON.Vector3(0, 3, 0),
                scene
            );
            camera.lowerRadiusLimit = 6;
            camera.upperRadiusLimit = 25;
            camera.lowerBetaLimit = 0.2;
            camera.upperBetaLimit = Math.PI / 2.05;
            camera.attachControl(canvas, true);
            camera.wheelPrecision = 50;
            camera.panningSensibility = 0;

            const sun = new BABYLON.DirectionalLight(
                "sun",
                new BABYLON.Vector3(-0.3, -0.8, -0.2),
                scene
            );
            sun.intensity = 1.8;
            sun.diffuse = new BABYLON.Color3(
                sceneConfig.sunColor.r,
                sceneConfig.sunColor.g,
                sceneConfig.sunColor.b
            );

            const ambient = new BABYLON.HemisphericLight(
                "ambient",
                new BABYLON.Vector3(0, 1, 0),
                scene
            );
            ambient.intensity = 0.6;
            ambient.diffuse = new BABYLON.Color3(0.5, 0.55, 0.5);
            ambient.groundColor = new BABYLON.Color3(0.1, 0.12, 0.08);

            let shadowGenerator = null;
            if (!isMobile) {
                shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
                shadowGenerator.useBlurExponentialShadowMap = true;
                shadowGenerator.blurKernel = 64;
                shadowGenerator.setDarkness(0.3);
            }

            createGround(shadowGenerator);
            createTree(shadowGenerator);
            createParticles();

            let lastTime = performance.now();
            let cameraAngle = Math.PI / 2;

            engine.runRenderLoop(function() {
                const currentTime = performance.now();
                const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
                lastTime = currentTime;

                cameraAngle += deltaTime * 0.025;
                camera.alpha = Math.PI / 2 + Math.sin(cameraAngle) * 0.15;
                camera.beta = Math.PI / 2.6 + Math.sin(cameraAngle * 0.5) * 0.02;

                animateTree(deltaTime, currentTime / 1000);
                
                // Dynamic camera distance
                const baseRadius = isMobile ? 16 : 12;
                const targetRadius = baseRadius - currentGrowth * 3;
                camera.radius += (targetRadius - camera.radius) * 0.01;
                
                scene.render();
            });

            window.addEventListener('resize', function() {
                engine.resize();
            });

            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                updateCountdown();
                setInterval(updateCountdown, 1000);
            }, 1000);

        } catch (e) {
            console.error('Scene init error:', e);
            initFallback();
        }
    }

    function createGround(shadowGenerator) {
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 100,
            height: 100,
            subdivisions: 4
        }, scene);

        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.06, 0.1, 0.05);
        groundMat.specularColor = new BABYLON.Color3(0.01, 0.02, 0.01);
        ground.material = groundMat;
        ground.receiveShadows = true;

        // Grass blades
        const grassCount = isMobile ? 50 : 100;
        for (let i = 0; i < grassCount; i++) {
            const dist = 1.5 + Math.random() * 20;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            
            const blade = BABYLON.MeshBuilder.CreatePlane(`grass${i}`, {
                width: 0.04 + Math.random() * 0.04,
                height: 0.08 + Math.random() * 0.2
            }, scene);
            
            blade.position = new BABYLON.Vector3(x, 0.06, z);
            blade.rotation.y = Math.random() * Math.PI * 2;
            blade.rotation.x = -0.1;
            
            const grassMat = new BABYLON.StandardMaterial(`grassMat${i}`, scene);
            grassMat.diffuseColor = new BABYLON.Color3(
                0.08 + Math.random() * 0.08,
                0.25 + Math.random() * 0.2,
                0.06 + Math.random() * 0.04
            );
            grassMat.specularColor = BABYLON.Color3.Black();
            grassMat.backFaceCulling = false;
            blade.material = grassMat;
        }
    }

    // ============================================
    // TREE GENERATOR CLASS
    // ============================================
    
    class TreeGenerator {
        constructor(sceneRef, shadowGen, mobile) {
            this.scene = sceneRef;
            this.shadowGenerator = shadowGen;
            this.isMobile = mobile;

            this.root = new BABYLON.TransformNode("tree", sceneRef);
            this.segments = [];
            this.branches = [];
            this.leafClusters = [];
            this.flowers = [];

            this.maxSegments = 14;
            this.segmentHeight = 0.45;
            this.maxTreeHeight = this.maxSegments * this.segmentHeight;

            this.trunkMat = new BABYLON.StandardMaterial("trunkMat", sceneRef);
            this.trunkMat.diffuseColor = new BABYLON.Color3(0.32, 0.22, 0.12);
            this.trunkMat.specularColor = new BABYLON.Color3(0.08, 0.06, 0.03);

            this.buildTrunk();
            this.buildBranches();
            this.buildLeaves();
            this.buildFlowers();
        }

        buildTrunk() {
            const baseThickness = 0.45;

            for (let i = 0; i < this.maxSegments; i++) {
                const taperFactor = 1 - (i / this.maxSegments) * 0.75;
                const segmentThickness = baseThickness * taperFactor;

                const segment = BABYLON.MeshBuilder.CreateCylinder(`trunk_seg_${i}`, {
                    height: this.segmentHeight,
                    diameterTop: segmentThickness * 0.85,
                    diameterBottom: segmentThickness,
                    tessellation: this.isMobile ? 8 : 12
                }, this.scene);

                segment.material = this.trunkMat;
                segment.parent = this.root;
                segment.position.y = i * this.segmentHeight + this.segmentHeight / 2;
                segment.scaling = new BABYLON.Vector3(0, 0, 0);
                segment.unlockDay = i < 3 ? 0 : Math.floor(((i - 3) / (this.maxSegments - 3)) * 28);
                segment.index = i;

                if (this.shadowGenerator) {
                    this.shadowGenerator.addShadowCaster(segment);
                }

                this.segments.push(segment);
            }
        }

        buildBranches() {
            const branchConfigs = [
                { segIndex: 3, angle: 0, tilt: 0.65, length: 1.0, day: 8 },
                { segIndex: 3, angle: Math.PI, tilt: 0.7, length: 0.9, day: 8 },
                { segIndex: 5, angle: Math.PI * 0.5, tilt: 0.55, length: 1.3, day: 12 },
                { segIndex: 5, angle: Math.PI * 1.5, tilt: 0.6, length: 1.2, day: 12 },
                { segIndex: 7, angle: Math.PI * 0.25, tilt: 0.5, length: 1.5, day: 16 },
                { segIndex: 7, angle: Math.PI * 1.25, tilt: 0.5, length: 1.4, day: 16 },
                { segIndex: 9, angle: Math.PI * 0.75, tilt: 0.45, length: 1.3, day: 22 },
                { segIndex: 9, angle: Math.PI * 1.75, tilt: 0.45, length: 1.2, day: 22 },
                { segIndex: 11, angle: Math.PI * 0.1, tilt: 0.4, length: 1.0, day: 28 },
                { segIndex: 11, angle: Math.PI * 1.1, tilt: 0.4, length: 1.1, day: 28 },
                { segIndex: 12, angle: Math.PI * 0.6, tilt: 0.35, length: 0.8, day: 32 },
                { segIndex: 12, angle: Math.PI * 1.6, tilt: 0.35, length: 0.9, day: 32 },
                { segIndex: 13, angle: Math.PI * 0.35, tilt: 0.25, length: 0.6, day: 36 },
                { segIndex: 13, angle: Math.PI * 1.35, tilt: 0.25, length: 0.7, day: 36 }
            ];

            branchConfigs.forEach((config, idx) => {
                const parentSegment = this.segments[config.segIndex];
                if (!parentSegment) return;

                const pivot = new BABYLON.TransformNode(`branch_pivot_${idx}`, this.scene);
                pivot.parent = parentSegment;
                pivot.position.y = this.segmentHeight * 0.4;
                pivot.rotation.y = config.angle;
                pivot.rotation.z = config.tilt;

                const branch = BABYLON.MeshBuilder.CreateCylinder(`branch_${idx}`, {
                    height: config.length,
                    diameterTop: 0.025,
                    diameterBottom: 0.08,
                    tessellation: this.isMobile ? 6 : 8
                }, this.scene);

                branch.material = this.trunkMat;
                branch.parent = pivot;
                branch.position.y = config.length / 2;
                pivot.scaling = new BABYLON.Vector3(0, 0, 0);

                if (this.shadowGenerator) {
                    this.shadowGenerator.addShadowCaster(branch);
                }

                this.branches.push({
                    pivot: pivot,
                    mesh: branch,
                    config: config,
                    unlockDay: config.day,
                    baseTilt: config.tilt,
                    phase: Math.random() * Math.PI * 2
                });
            });
        }

        buildLeaves() {
            const leavesPerBranch = this.isMobile ? 6 : 10;
            const leafMats = [];
            
            for (let m = 0; m < 5; m++) {
                const mat = new BABYLON.StandardMaterial(`leafMat_${m}`, this.scene);
                const greenBase = 0.30 + m * 0.08;
                mat.diffuseColor = new BABYLON.Color3(0.12 + m * 0.02, greenBase, 0.10 + m * 0.015);
                mat.specularColor = new BABYLON.Color3(0.04, 0.08, 0.03);
                mat.backFaceCulling = false;
                leafMats.push(mat);
            }

            this.branches.forEach((branchData, bIdx) => {
                const cluster = new BABYLON.TransformNode(`leaf_cluster_${bIdx}`, this.scene);
                cluster.parent = branchData.mesh;
                cluster.position.y = branchData.config.length * 0.45;
                const leaves = [];

                for (let i = 0; i < leavesPerBranch; i++) {
                    const leafSize = 0.12 + Math.random() * 0.15;
                    const leaf = BABYLON.MeshBuilder.CreateDisc(`leaf_${bIdx}_${i}`, {
                        radius: leafSize,
                        tessellation: 6
                    }, this.scene);

                    leaf.material = leafMats[Math.floor(Math.random() * leafMats.length)];
                    leaf.parent = cluster;

                    const theta = (i / leavesPerBranch) * Math.PI * 2 + Math.random() * 0.5;
                    const phi = Math.random() * Math.PI * 0.6;
                    const r = 0.25 + Math.random() * 0.45;

                    leaf.position = new BABYLON.Vector3(
                        Math.sin(phi) * Math.cos(theta) * r,
                        Math.cos(phi) * r * 0.4 + 0.1,
                        Math.sin(phi) * Math.sin(theta) * r
                    );
                    leaf.rotation.x = Math.random() * 0.6 - 0.3;
                    leaf.rotation.y = Math.random() * Math.PI * 2;
                    leaf.phase = Math.random() * Math.PI * 2;
                    leaves.push(leaf);
                }

                this.leafClusters.push({
                    cluster: cluster,
                    leaves: leaves,
                    unlockDay: branchData.unlockDay + 4,
                    phase: Math.random() * Math.PI * 2
                });
            });

            // Early sprouts for Day 1 visual
            this.buildEarlySprouts(leafMats);
        }

        buildEarlySprouts(leafMats) {
            const sproutConfigs = [
                { segIndex: 2, count: 4, radius: 0.15, unlockDay: 0 },
                { segIndex: 3, count: 5, radius: 0.18, unlockDay: 2 },
                { segIndex: 4, count: 6, radius: 0.22, unlockDay: 5 }
            ];

            sproutConfigs.forEach((config, cIdx) => {
                const parentSegment = this.segments[config.segIndex];
                if (!parentSegment) return;

                const sproutCluster = new BABYLON.TransformNode(`sprout_cluster_${cIdx}`, this.scene);
                sproutCluster.parent = parentSegment;
                sproutCluster.position.y = this.segmentHeight * 0.5;
                const sprouts = [];

                for (let i = 0; i < config.count; i++) {
                    const leafSize = 0.06 + Math.random() * 0.08;
                    const leaf = BABYLON.MeshBuilder.CreateDisc(`sprout_${cIdx}_${i}`, {
                        radius: leafSize,
                        tessellation: 5
                    }, this.scene);

                    leaf.material = leafMats[Math.floor(Math.random() * leafMats.length)];
                    leaf.parent = sproutCluster;

                    const angle = (i / config.count) * Math.PI * 2;
                    const r = config.radius + Math.random() * 0.08;

                    leaf.position = new BABYLON.Vector3(
                        Math.cos(angle) * r,
                        0.05 + Math.random() * 0.1,
                        Math.sin(angle) * r
                    );
                    leaf.rotation.x = -0.3 + Math.random() * 0.2;
                    leaf.rotation.y = angle + Math.PI;
                    leaf.phase = Math.random() * Math.PI * 2;
                    sprouts.push(leaf);
                }

                this.leafClusters.push({
                    cluster: sproutCluster,
                    leaves: sprouts,
                    unlockDay: config.unlockDay,
                    phase: Math.random() * Math.PI * 2
                });
            });
        }

        buildFlowers() {
            const flowerCount = this.isMobile ? 8 : 18;
            const flowerColors = [
                new BABYLON.Color3(1, 0.88, 0.92),
                new BABYLON.Color3(1, 0.96, 0.85),
                new BABYLON.Color3(0.96, 0.92, 1),
                new BABYLON.Color3(1, 0.92, 0.88)
            ];

            for (let i = 0; i < flowerCount; i++) {
                const branchIdx = Math.floor((i / flowerCount) * this.branches.length);
                const branchData = this.branches[branchIdx];
                if (!branchData) continue;

                const flower = BABYLON.MeshBuilder.CreateDisc(`flower_${i}`, {
                    radius: 0.06 + Math.random() * 0.05,
                    tessellation: 8
                }, this.scene);

                const flowerMat = new BABYLON.StandardMaterial(`flowerMat_${i}`, this.scene);
                flowerMat.diffuseColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                flowerMat.emissiveColor = flowerMat.diffuseColor.scale(0.25);
                flowerMat.backFaceCulling = false;
                flower.material = flowerMat;
                flower.parent = branchData.mesh;

                const posY = branchData.config.length * (0.3 + Math.random() * 0.5);
                const offsetAngle = Math.random() * Math.PI * 2;
                const offsetR = 0.15 + Math.random() * 0.2;

                flower.position = new BABYLON.Vector3(
                    Math.cos(offsetAngle) * offsetR,
                    posY,
                    Math.sin(offsetAngle) * offsetR
                );
                flower.rotation = new BABYLON.Vector3(Math.random() * Math.PI, Math.random() * Math.PI * 2, 0);
                flower.scaling = new BABYLON.Vector3(0, 0, 0);
                flower.phase = Math.random() * Math.PI * 2;
                flower.unlockDay = 36 + Math.floor((i / flowerCount) * 8);

                this.flowers.push(flower);
            }
        }

        updateGrowth(day, totalDays, time) {
            this.segments.forEach((segment) => {
                if (day >= segment.unlockDay) {
                    const age = (day - segment.unlockDay) / 3;
                    const scale = Math.min(1, age);
                    const currentScale = segment.scaling.x;
                    const newScale = currentScale + (scale - currentScale) * 0.1;
                    segment.scaling = new BABYLON.Vector3(newScale, newScale, newScale);
                }
            });

            this.branches.forEach((branchData) => {
                if (day >= branchData.unlockDay) {
                    const age = (day - branchData.unlockDay) / 5;
                    const scale = Math.min(1, age);
                    const currentScale = branchData.pivot.scaling.x;
                    const newScale = currentScale + (scale - currentScale) * 0.08;
                    branchData.pivot.scaling = new BABYLON.Vector3(newScale, newScale, newScale);
                }
            });

            this.leafClusters.forEach((clusterData) => {
                if (day >= clusterData.unlockDay) {
                    const age = (day - clusterData.unlockDay) / 4;
                    const scale = Math.min(1, age);
                    clusterData.leaves.forEach((leaf) => {
                        const currentScale = leaf.scaling.x;
                        const newScale = currentScale + (scale - currentScale) * 0.06;
                        leaf.scaling = new BABYLON.Vector3(newScale, newScale, newScale);
                    });
                }
            });

            this.flowers.forEach((flower) => {
                if (day >= flower.unlockDay) {
                    const age = (day - flower.unlockDay) / 3;
                    const scale = Math.min(1, age);
                    const currentScale = flower.scaling.x;
                    const newScale = currentScale + (scale - currentScale) * 0.1;
                    flower.scaling = new BABYLON.Vector3(newScale, newScale, newScale);
                }
            });
        }

        applyWind(time, growthFactor) {
            const windStrength = 0.04 * growthFactor;

            this.root.rotation.z = Math.sin(time * 0.18) * 0.008 * growthFactor;
            this.root.rotation.x = Math.cos(time * 0.12) * 0.005 * growthFactor;

            this.branches.forEach((branchData) => {
                if (branchData.pivot.scaling.x > 0.1) {
                    const swayAmount = Math.sin(time * 1.1 + branchData.phase) * windStrength;
                    branchData.pivot.rotation.z = branchData.baseTilt + swayAmount;
                }
            });

            this.leafClusters.forEach((clusterData) => {
                clusterData.leaves.forEach((leaf) => {
                    if (leaf.scaling.x > 0.1) {
                        leaf.rotation.z = Math.sin(time * 1.6 + leaf.phase) * 0.12;
                        leaf.rotation.x += Math.cos(time * 1.2 + leaf.phase) * 0.003;
                    }
                });
            });

            this.flowers.forEach((flower) => {
                if (flower.scaling.x > 0.1) {
                    flower.rotation.z = Math.sin(time * 0.9 + flower.phase) * 0.08;
                }
            });
        }
    }

    function createTree(shadowGenerator) {
        treeGenerator = new TreeGenerator(scene, shadowGenerator, isMobile);
        tree = treeGenerator.root;
    }

    function createParticles() {
        particleSystem = new BABYLON.ParticleSystem("particles", isMobile ? 20 : 50, scene);

        const particleTexture = new BABYLON.DynamicTexture("particleTex", 32, scene);
        const ctx = particleTexture.getContext();
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(200, 230, 180, 0.6)");
        gradient.addColorStop(0.5, "rgba(180, 220, 160, 0.25)");
        gradient.addColorStop(1, "rgba(160, 200, 140, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        particleTexture.update();

        particleSystem.particleTexture = particleTexture;
        particleSystem.emitter = new BABYLON.Vector3(0, 1, 0);
        particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.3, -0.5);
        particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5);

        particleSystem.color1 = new BABYLON.Color4(0.75, 0.85, 0.65, 0.15);
        particleSystem.color2 = new BABYLON.Color4(0.65, 0.8, 0.55, 0.1);
        particleSystem.colorDead = new BABYLON.Color4(0.55, 0.75, 0.45, 0);

        particleSystem.minSize = 0.02;
        particleSystem.maxSize = 0.06;
        particleSystem.minLifeTime = 4;
        particleSystem.maxLifeTime = 8;
        particleSystem.emitRate = isMobile ? 3 : 8;

        particleSystem.gravity = new BABYLON.Vector3(0, 0.01, 0);
        particleSystem.direction1 = new BABYLON.Vector3(-0.1, 0.1, -0.1);
        particleSystem.direction2 = new BABYLON.Vector3(0.1, 0.3, 0.1);

        particleSystem.minEmitPower = 0.02;
        particleSystem.maxEmitPower = 0.08;

        particleSystem.start();
    }

    function updateParticles() {
        if (!particleSystem) return;

        const treeHeight = 1.5 + currentGrowth * 5;
        const spread = 0.5 + currentGrowth * 2.5;

        particleSystem.emitter = new BABYLON.Vector3(0, treeHeight, 0);
        particleSystem.minEmitBox = new BABYLON.Vector3(-spread, -0.5, -spread);
        particleSystem.maxEmitBox = new BABYLON.Vector3(spread, 1, spread);
        particleSystem.emitRate = (isMobile ? 3 : 8) * (0.3 + currentGrowth * 0.7);
    }

    function animateTree(deltaTime, time) {
        if (!treeGenerator) return;

        currentGrowth += (targetGrowth - currentGrowth) * deltaTime * 0.3;
        const day = currentDay;

        treeGenerator.updateGrowth(day, TOTAL_DAYS, time);
        treeGenerator.applyWind(time, currentGrowth);
        updateParticles();
    }

    function initFallback() {
        // Canvas 2D fallback for older browsers
        const ctx = canvas.getContext('2d');
        let animTime = 0;

        function drawFallback() {
            animTime += 0.016;
            const w = canvas.width = window.innerWidth * window.devicePixelRatio;
            const h = canvas.height = window.innerHeight * window.devicePixelRatio;

            const scale = window.devicePixelRatio;
            ctx.setTransform(scale, 0, 0, scale, 0, 0);

            const width = window.innerWidth;
            const height = window.innerHeight;

            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#0a1628');
            gradient.addColorStop(0.5, '#12253d');
            gradient.addColorStop(1, '#1a3a52');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            currentGrowth += (targetGrowth - currentGrowth) * 0.02;

            // Draw simple tree
            const centerX = width / 2;
            const baseY = height * 0.7;
            const trunkHeight = 50 + currentGrowth * 150;

            ctx.fillStyle = '#3d2817';
            ctx.beginPath();
            ctx.moveTo(centerX - 10, baseY);
            ctx.lineTo(centerX - 6, baseY - trunkHeight);
            ctx.lineTo(centerX + 6, baseY - trunkHeight);
            ctx.lineTo(centerX + 10, baseY);
            ctx.fill();

            if (currentGrowth > 0.1) {
                ctx.fillStyle = '#2a5a3a';
                ctx.beginPath();
                ctx.ellipse(centerX, baseY - trunkHeight - 20, 40 * currentGrowth, 30 * currentGrowth, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(drawFallback);
        }

        drawFallback();

        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }, 500);
    }

    // Initialize
    loadBabylon();

})();
