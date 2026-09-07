/* 简易全屏飘雪带开关特效 */
(function() {
    // 1. 创建画布
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999'; // 确保雪花飘在最上层
    canvas.style.pointerEvents = 'none'; // 防止雪花阻挡鼠标点击网页内容
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let flakes = [];
    let isSnowing = true; // 下雪开关状态
    let animationFrameId;

    // 2. 生成雪花数据
    for (let i = 0; i < 80; i++) { // 80代表雪花数量
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1, // 雪花半径大小
            d: Math.random() * 1 // 下落速度
        });
    }

    // 3. 绘制雪花
    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // 雪花颜色
        ctx.beginPath();
        for (let i = 0; i < flakes.length; i++) {
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        move();
    }

    // 4. 雪花飘落逻辑
    function move() {
        for (let i = 0; i < flakes.length; i++) {
            let f = flakes[i];
            f.y += Math.pow(f.d, 2) + 0.5;
            f.x += Math.sin(f.y / 30) * 0.5;
            if (f.y > height) {
                flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d };
            }
        }
    }

    function run() {
        if (!isSnowing) return;
        draw();
        animationFrameId = requestAnimationFrame(run);
    }

    // 启动下雪
    run();

    // 5. 【核心：添加开关按钮】在网页右下角生成一个控制按钮
    const btn = document.createElement('div');
    btn.innerHTML = '❄️';
    btn.style.position = 'fixed';
    btn.style.bottom = '85px'; // 放在右下角，避开默认的回到顶部按钮
    btn.style.right = '20px';
    btn.style.width = '35px';
    btn.style.height = '35px';
    btn.style.background = 'rgba(255,255,255,0.9)';
    btn.style.borderRadius = '50%';
    btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    btn.style.textAlign = 'center';
    btn.style.lineHeight = '35px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '10000';
    btn.title = '开启/关闭下雪';
    document.body.appendChild(btn);

    // 点击按钮切换下雪状态
    btn.addEventListener('click', function() {
        isSnowing = !isSnowing;
        if (isSnowing) {
            btn.innerHTML = '❄️';
            btn.style.opacity = '1';
            run();
        } else {
            btn.innerHTML = '❌';
            btn.style.opacity = '0.6';
            ctx.clearRect(0, 0, width, height); // 清空屏幕上的雪花
            cancelAnimationFrame(animationFrameId);
        }
    });

    // 屏幕尺寸改变时重置画布
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
})();