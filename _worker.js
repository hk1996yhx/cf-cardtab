const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 标签页标题 -->
    <title>星际导航站</title>
    <!-- 标签页图标 -->
    <link rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>">
    <!-- 预加载常用的搜索引擎图标
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.baidu.com/s?wd=" as="image">
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.bing.com/search?q=" as="image">
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.google.com/search?q=" as="image">
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.youtube.com/results?search_query="
        as="image">
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.tiktok.com" as="image">
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://search.bilibili.com/all?keyword="
        as="image">
    -->
    <link rel="preload" href="https://getfavicon.377020945.xyz/?url=https://www.baidu.com/s?wd=" as="image">
    <link rel="prefetch" href="https://getfavicon.377020945.xyz/?url=https://www.bing.com/search?q=">
    <link rel="prefetch" href="https://getfavicon.377020945.xyz/?url=https://www.google.com/search?q=">
    <link rel="prefetch" href="https://getfavicon.377020945.xyz/?url=https://www.youtube.com/results?search_query=">
    <link rel="prefetch" href="https://getfavicon.377020945.xyz/?url=https://www.tiktok.com">
    <link rel="prefetch" href="https://getfavicon.377020945.xyz/?url=https://search.bilibili.com/all?keyword=">
    <!-- 其他搜索引擎图标... -->
    <style>
        /* 全局样式 */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e8f4ea;
            transition: background-color 0.3s ease;
        }
        /* 搜索页样式 */
        .searchpage {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100%;
            /* 设置初始高度为视窗高度 */
            width: 100%;
            transition: height 0.8s ease-in-out, opacity 2s ease;
            opacity: 1;
            z-index: 999;
            padding-bottom: 100px;
        }
        /* 当搜索页收起时的状态 */
        .searchpage.hide {
            height: 0%;
            opacity: 0;
            z-index: -1;
        }
        /* 中心内容样式 */
        .center-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 600px;
            text-align: center;
        }
        .center-content h3 {
            color: white;
            padding: 10px;
            display: inline-block;
        }
        /* 搜索栏样式 */
        .search-container {
            margin-top: 10px;
        }
        .search-bar {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            background: rgba(255, 255, 255, 0.8);
            /* 半透明背景 */
            border-radius: 50px;
            padding: 10px 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            /* 更柔和的阴影效果 */
            backdrop-filter: blur(8px);
            /* 背景模糊效果，增添气泡感 */
        }
        .search-bar input {
            width: 70%;
            padding: 12px 16px;
            font-size: 16px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 30px;
            outline: none;
            background-color: rgba(255, 255, 255, 0.8);
            /* 输入框半透明背景 */
            transition: all 0.3s ease;
        }
        .search-bar input:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
        }
        .search-bar button {
            padding: 12px 18px;
            font-size: 16px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            background-color: rgba(76, 175, 80, 0.8);
            /* 半透明绿色按钮 */
            color: white;
            border-radius: 30px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.1s ease;
        }
        .search-bar button:hover {
            background-color: rgba(76, 175, 80, 1);
            /* 悬停时变为不透明 */
            transform: translateY(-2px);
            /* 提升按钮的悬浮效果 */
        }
        .search-bar button:active {
            background-color: rgba(56, 142, 60, 0.8);
            transform: translateY(2px);
            /* 按钮点击时向下沉降的效果 */
        }
        /* 搜索引擎按钮样式 */
        .search-engines {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        .search-engine {
            padding: 10px 20px;
            font-size: 16px;
            border: 1px solid #ddd;
            color: white;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .search-engine:hover {
            background-color: #4CAF50;
            color: white;
            border-color: #4CAF50;
            transform: translateY(-3px);
        }
        /* hitokoto样式 */
        #hitokoto {
            /* 使用 fixed 使元素固定在浏览器窗口 */
            position: fixed;
            /* 元素距离顶部 0px */
            top: 0;
            /* 设置足够大的 z-index，确保它位于其他元素之上 */
            z-index: 9999;
            color: white;
            padding: 10px;
            background-size: cover;
            /* 阻止文本自动换行 */
            white-space: nowrap;
            display: inline-block;
        }
        /* 管理员控制面板样式 */
        .admin-controls {
            /*置顶*/
            z-index: 9999;
            position: fixed;
            top: 10px;
            right: 10px;
            font-size: 60%;
        }
        /* 标签页样式 */
        .content {
            position: absolute;
            padding: 20px;
            top: 0;
            left: 0;
            height: 0%;
            /* 添加平滑动画 */
            transition: height 0.8s ease-in-out, opacity 1s ease;
            /* 初始完全不透明 */
            opacity: 0;
            padding-top: 100px;
            padding-bottom: 100px;
        }
        /* 标签页展开样式 */
        .content.show {
            height: 100%;
            opacity: 1;
        }
        /* 添加/删除控制按钮样式 */
        .add-remove-controls {
            display: none;
            flex-direction: column;
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            align-items: center;
            gap: 10px;
        }
        .round-btn {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 24px;
            line-height: 40px;
            cursor: pointer;
            margin: 5px 0;
        }
        .add-btn {
            order: 1;
        }
        .remove-btn {
            order: 2;
        }
        .category-btn {
            order: 3;
        }
        .remove-category-btn {
            order: 4;
        }
        /* 主题切换按钮样式 */
        #theme-toggle {
            position: fixed;
            bottom: 50px;
            right: 20px;
            background-color: #b8c9d9;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            text-align: center;
            font-size: 24px;
            line-height: 40px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease;
        }
        #theme-toggle:hover {
            background-color: #007bff;
        }
        /* 对话框样式 */
        #dialog-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        #dialog-box {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
        }
        #dialog-box input,
        #dialog-box select {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
        }
        /* 分类和卡片样式 */
        .section {
            margin-bottom: 20px;
        }
        .section-title-container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .section-title {
            color: white;
            font-size: 18px;
            font-weight: bold;
            white-space: nowrap;
            /* 阻止文本自动换行 */
        }
        /* 删除按钮样式 */
        .delete-category-btn {
            background-color: #f44336;
            /* 红色背景 */
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .delete-category-btn:hover {
            background-color: #d32f2f;
        }
        /* 修改按钮样式 */
        .edit-category-btn {
            background-color: #ff9800;
            /* 绿色背景 */
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .edit-category-btn:hover {
            background-color: #388e3c;
        }
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: flex-start;
            /* 让卡片从左到右排列 */
        }
        .card {
            border-radius: 5px;
            padding: 10px;
            width: 150px;
            cursor: pointer;
            transition: transform 0.2s;
            position: relative;
            user-select: none;
            flex-basis: 150px;
            /* 保持卡片宽度 */
            flex-grow: 0;
            /* 防止卡片撑大 */
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card-top {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }
        .card-icon {
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
        .card-title {
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .card-url {
            font-size: 12px;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .private-tag {
            background-color: #ff9800;
            color: white;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            position: absolute;
            top: 5px;
            right: 5px;
        }
        .delete-btn {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            cursor: pointer;
            display: none;
        }
        /* 版权信息样式 */
        #copyright {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            z-index: 100;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
        }
        #copyright p {
            margin: 0;
        }
        #copyright a {
            color: #007bff;
            text-decoration: none;
        }
        #copyright a:hover {
            text-decoration: underline;
        }
        /* 响应式设计 */
        @media (max-width: 480px) {
            .searchpage {
                position: relative;
                padding: 5px;
            }
            .content {
                margin-top: 10px;
            }
            .admin-controls input,
            .admin-controls button {
                height: 30%;
            }
            .card-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .card {
                width: 80%;
                max-width: 100%;
                padding: 5px;
            }
            .card-title {
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 130px;
            }
            .card-url {
                font-size: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 130px;
            }
            .add-remove-controls {
                right: 2px;
            }
            .round-btn,
            #theme-toggle {
                right: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="allbodydiv">
        <!-- 一言模块 -->
        <p id="hitokoto">
            <a href="#" id="hitokoto_text"></a>
        </p>
        <!-- 管理员控制面板 -->
        <div class="admin-controls">
            <input type="password" id="admin-password" placeholder="输入密码">
            <button id="admin-mode-btn" onclick="toggleAdminMode()">设 置</button>
            <button id="secret-garden-btn" onclick="toggleSecretGarden()">登 录</button>
        </div>
        <!-- 搜索页 -->
        <div class="searchpage">
            <div class="center-content">
                <h3>星际导航站</h3>
                <!-- 搜索栏 -->
                <div class="search-container">
                    <div class="search-bar">
                        <input type="text" id="search-input" placeholder="">
                        <button id="search-button">🔍</button>
                    </div>
                    <div class="search-engines">
                        <button class="search-engine" data-engine="baidu">百度</button>
                        <button class="search-engine" data-engine="bing">必应</button>
                        <button class="search-engine" data-engine="google">谷歌</button>
                        <button class="search-engine" data-engine="youtube">YouTube</button>
                        <button class="search-engine" data-engine="douyin">抖音</button>
                        <button class="search-engine" data-engine="bilibili">bilibili</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 书签 -->
        <div class="content">
            <!-- 类别目录 -->
            <!-- 分类和卡片容器 -->
            <div id="sections-container"></div>
            <!-- 主题切换按钮 -->
            <button id="theme-toggle" onclick="toggleTheme()">◑</button>
            <!-- 添加链接对话框 -->
            <div id="dialog-overlay">
                <div id="dialog-box">
                    <label for="name-input">名称</label>
                    <input type="text" id="name-input">
                    <label for="url-input">地址</label>
                    <input type="text" id="url-input">
                    <label for="category-select">选择分类</label>
                    <select id="category-select"></select>
                    <div class="private-link-container">
                        <label for="private-checkbox">私密链接</label>
                        <input type="checkbox" id="private-checkbox">
                    </div>
                    <button onclick="addLink()">确定</button>
                    <button onclick="hideAddDialog()">取消</button>
                </div>
            </div>
            <!-- 添加/删除控制按钮 -->
            <div class="add-remove-controls">
                <button class="round-btn add-btn" onclick="showAddDialog()">+</button>
                <button class="round-btn remove-btn" onclick="toggleRemoveMode()">-</button>
                <button class="round-btn category-btn" onclick="addCategory()">C+</button>
                <button class="round-btn remove-category-btn" onclick="toggleRemoveCategory()">C-</button>
            </div>
            <!-- 版权信息 -->
            <div id="copyright" class="copyright">
                <!--请不要删除-->
                <p>本项目地址: <a href="https://github.com/hk1996yhx/cf-cardtab" target="_blank">GitHub</a> 原项目地址: <a
                        href="https://github.com/hmhm2022/Card-Tab" target="_blank">GitHub</a> 如果喜欢，烦请点个star！</p>
            </div>
        </div>
    </div>
    <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
    <script>
        //动态设置背景及颜色
        function generateRandomBackgroundImage() {
            // Array of sample image URLs
            const backgrounds = [
                'url(https://image.377020945.xyz/file/00b532f864fc091fbcfb5.jpg)',
                'url(https://image.377020945.xyz/file/06085c6795ad594fa5a43.jpg)',
                'url(https://image.377020945.xyz/file/0f1aa31aaa841b284c4c2.png)',
                'url(https://image.377020945.xyz/file/1f49e51aaf3978aff844d.jpg)',
                'url(https://image.377020945.xyz/file/1f8b152adb232d95b21d2.jpg)',
                'url(https://image.377020945.xyz/file/20ebbbc1931b1aa464954.png)',
                'url(https://image.377020945.xyz/file/38953f3a7fdf833f4aed5.jpg)',
                'url(https://image.377020945.xyz/file/3b372230387c8aa4c65d7.jpg)',
                'url(https://image.377020945.xyz/file/4f3ebaa42e411279f6bd4.png)',
                'url(https://image.377020945.xyz/file/585ff8a7a2a95f0b7d28a.png)',
                'url(https://image.377020945.xyz/file/5d9fcbc55431cca672819.jpg)',
                'url(https://image.377020945.xyz/file/707997a15fbd5cb84aa68.jpg)',
                'url(https://image.377020945.xyz/file/73905ceec754b57346ce2.jpg)',
                'url(https://image.377020945.xyz/file/83d9a02ef82a1835cbddc.png)',
                'url(https://image.377020945.xyz/file/90d7c8c8559cb5b95deec.png)',
                'url(https://image.377020945.xyz/file/9aa5380449cd603fade91.png)',
                'url(https://image.377020945.xyz/file/a517ac3afc91bedbcd6a1.png)',
                'url(https://image.377020945.xyz/file/aa32fd44af924e90ae2f6.jpg)',
                'url(https://image.377020945.xyz/file/d38cc4120b1a2ef030c6a.png)',
                'url(https://image.377020945.xyz/file/d6ea559327b80c307b4c9.png)',
                'url(https://image.377020945.xyz/file/dd4b000063b3075b6d36a.jpg)',
                'url(https://image.377020945.xyz/file/e29614f3d15be71097d6f.jpg)',
                'url(https://image.377020945.xyz/file/ebdc359bebc1e310f4149.jpg)',
                'url(https://image.377020945.xyz/file/f7153f906745ef4cf3259.png)',
                // Add more image URLs as needed
            ];
            // Choose a random image URL from the array
            return backgrounds[Math.floor(Math.random() * backgrounds.length)];
        }
        function generateRandomRGBA() {
            // 对每个颜色通道分别生成随机数
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            return 'rgba(' + red + ',' + green + ',' + blue + ',0.6)';
        }
        var headbackground = generateRandomBackgroundImage();
        var bodybackground = generateRandomBackgroundImage();
        var colorbackground = generateRandomRGBA();
        function changeheadbackground() {
            document.querySelector('.searchpage').style.background = headbackground;
        }
        function changebodybackground() {
            document.body.style.background = bodybackground;
        }
        function changecolorbackground() {
            document.querySelector('#hitokoto').style.background = colorbackground;
            document.querySelector('.center-content h3').style.background = colorbackground;
            document.querySelector('.search-bar').style.background = colorbackground;
            document.querySelector('.search-bar button').style.background = colorbackground;
            document.querySelector('.search-engine').style.background = colorbackground;
        }
        changeheadbackground();
        changebodybackground();
        changecolorbackground();
        // 监听滚动事件
        const searchpage = document.querySelector('.searchpage');
        const content = document.querySelector('.content');
        let debounceTimeout;
        let isContentVisible = false
        window.addEventListener('scroll', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const scrollPosition = window.scrollY; // 当前滚动的像素值
                if (scrollPosition >= 30 && !isContentVisible) { // 如果滚动超过 50 像素
                    content.classList.add('show'); // 显示主内容
                    searchpage.classList.add('hide'); // 添加类名，触发动画
                    window.scrollTo(0, 2);
                    isContentVisible = true
                } else if (scrollPosition <= 1 && isContentVisible) {
                    searchpage.classList.remove('hide'); // 恢复模块
                    content.classList.remove('show'); // 隐藏主内容
                    isContentVisible = false
                }
            }, 100); // 100ms 后执行
        });
        // 日志记录函数
        function logAction(action, details) {
            const timestamp = new Date().toISOString();
            const logEntry = timestamp + ': ' + action + ' - ' + JSON.stringify(details);
            console.log(logEntry);
        }
        // 搜索引擎配置
        const searchEngines = {
            baidu: "https://www.baidu.com/s?wd=",
            bing: "https://www.bing.com/search?q=",
            google: "https://www.google.com/search?q=",
            youtube: "https://www.youtube.com/results?search_query=",
            douyin: "https://www.douyin.com/search/",
            bilibili: "https://search.bilibili.com/all?keyword=",
        };
        //默认搜索引擎
        let currentEngine = "baidu";
        // 设置当前搜索引擎
        function setActiveEngine(engine) {
            currentEngine = engine;
            // 更新按钮图标
            const searchButton = document.getElementById('search-button');
            let searchUrl;
            if (engine === 'douyin') {
                searchUrl = 'https://getfavicon.377020945.xyz/?url=https://www.tiktok.com';
            } else {
                searchUrl = 'https://getfavicon.377020945.xyz/?url=' + searchEngines[engine];
            }
            // 创建一个 img 元素
            const img = document.createElement('img');
            img.src = searchUrl;  // 设置 src 为目标 URL，这个地址会返回图标
            img.alt = "Icon";  // 设置 alt 属性，用于图标未加载时的替代文本
            img.style.width = "30px";  // 设置图标的宽度
            img.style.height = "30px";  // 设置图标的高度
            // 将 img 元素插入到按钮中
            searchButton.innerHTML = '';  // 清空现有内容
            searchButton.appendChild(img);  // 添加图标到按钮中
            document.querySelectorAll('.search-engine').forEach(btn => {
                // 判断按钮是否是选中的搜索引擎
                if (btn.dataset.engine === engine) {
                    // 设置选中的样式
                    btn.style.backgroundColor = '#7DF9FF';  // 选中时的背景颜色
                } else {
                    // 设置未选中的样式
                    btn.style.backgroundColor = colorbackground; // 未选中时的背景颜色
                }
            });
            logAction('设置搜索引擎', { engine });
        }
        // 搜索引擎按钮点击事件
        document.querySelectorAll('.search-engine').forEach(button => {
            button.addEventListener('click', () => setActiveEngine(button.dataset.engine));
        });
        // 搜索按钮点击事件
        document.getElementById('search-button').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            if (query) {
                logAction('执行搜索', { engine: currentEngine, query });
                window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
            }
        });
        // 搜索输入框回车事件
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-button').click();
            }
        });
        // 初始化搜索引擎
        setActiveEngine(currentEngine);
        // 全局变量
        let publicLinks = [];
        let privateLinks = [];
        let isAdmin = false;
        let isLoggedIn = false;
        let removeMode = false;
        let isRemoveCategoryMode = false;
        let isDarkTheme = false;
        let links = [];
        const categories = {};
        // 添加新分类
        async function addCategory() {
            if (!await validateToken()) {
                return;
            }
            const categoryName = prompt('请输入新分类名称:');
            if (categoryName && !categories[categoryName]) {
                categories[categoryName] = [];
                updateCategorySelect();
                renderCategories();
                saveLinks();
                logAction('添加分类', { categoryName, currentLinkCount: links.length });
            } else if (categories[categoryName]) {
                alert('该分类已存在');
                logAction('添加分类失败', { categoryName, reason: '分类已存在' });
            }
        }
        // 修改分类名称
        async function editCategory(oldCategoryName) {
            if (!await validateToken()) {
                return;
            }
            const newCategoryName = prompt('请输入新的分类名称:', oldCategoryName);
            // 判断是否输入了有效的新分类名
            if (newCategoryName && !categories[newCategoryName]) {
                // 更新分类名
                categories[newCategoryName] = categories[oldCategoryName];
                delete categories[oldCategoryName];
                // 更新所有相关链接的分类名
                links.forEach(link => {
                    if (link.category === oldCategoryName) {
                        link.category = newCategoryName;
                    }
                });
                // 更新UI
                updateCategorySelect();
                renderCategories();
                saveLinks();
                logAction('修改分类', { oldCategoryName, newCategoryName });
            } else if (newCategoryName && categories[newCategoryName]) {
                alert('该分类名已存在');
                logAction('修改分类失败', { oldCategoryName, reason: '新分类名已存在' });
            } else if (!newCategoryName) {
                alert('分类名不能为空');
            }
        }
        // 删除分类
        async function deleteCategory(category) {
            if (!await validateToken()) {
                return;
            }
            if (confirm('确定要删除 "' + category + '" 分类吗？这将删除该分类下的所有链接。')) {
                delete categories[category];
                links = links.filter(link => link.category !== category);
                publicLinks = publicLinks.filter(link => link.category !== category);
                privateLinks = privateLinks.filter(link => link.category !== category);
                updateCategorySelect();
                saveLinks();
                renderCategories();
                logAction('删除分类', { category });
            }
        }
        // 渲染分类
        function renderCategories() {
            const container = document.getElementById('sections-container');
            container.innerHTML = '';
            Object.keys(categories).forEach(category => {
                const section = document.createElement('div');
                section.className = 'section';
                const titleContainer = document.createElement('div');
                titleContainer.className = 'section-title-container';
                const title = document.createElement('div');
                title.className = 'section-title';
                title.textContent = category;
                // 添加箭头
                const arrow = document.createElement('span');
                arrow.className = 'category-arrow';
                arrow.style.display = 'inline-block'; // 默认显示箭头
                titleContainer.appendChild(title);
                titleContainer.appendChild(arrow);
                const cardContainer = document.createElement('div');
                cardContainer.className = 'card-container';
                cardContainer.id = category;
                section.appendChild(titleContainer);
                section.appendChild(cardContainer);
                // 检查缓存状态并设置卡片初始显示
                const storedState = localStorage.getItem(category);
                const isCollapsed = storedState === 'collapsed';
                cardContainer.style.display = isCollapsed ? 'none' : 'flex';
                // 根据卡片状态设置箭头方向
                arrow.textContent = isCollapsed ? '▲' : ''; // 收缩显示 "▲"，展开显示 "▼"
                // 渲染卡片
                const categoryLinks = links.filter(link => link.category === category);
                categoryLinks.forEach(link => {
                    createCard(link, cardContainer);
                });
                container.appendChild(section);
                // 点击标题切换展开/收缩
                title.onclick = () => {
                    const isCurrentlyCollapsed = cardContainer.style.display === 'none';
                    // 切换卡片显示状态
                    cardContainer.style.display = isCurrentlyCollapsed ? 'flex' : 'none';
                    // 切换箭头方向
                    arrow.textContent = isCurrentlyCollapsed ? '' : '▲';
                    // 更新缓存
                    localStorage.setItem(category, isCurrentlyCollapsed ? 'expanded' : 'collapsed');
                    logAction(isCurrentlyCollapsed ? '展开分类' : '收缩分类', { category });
                };
                if (isAdmin) {
                    // 添加删除分类按钮
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '删除分类';
                    deleteBtn.className = 'delete-category-btn';
                    deleteBtn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
                    deleteBtn.onclick = () => deleteCategory(category);
                    titleContainer.appendChild(deleteBtn);
                    // 添加修改分类按钮
                    const editBtn = document.createElement('button');
                    editBtn.textContent = '修改分类名';
                    editBtn.className = 'edit-category-btn';
                    editBtn.style.display = isRemoveCategoryMode ? 'none' : 'inline-block';
                    editBtn.onclick = () => editCategory(category);
                    titleContainer.appendChild(editBtn);
                }
            });
            logAction('渲染分类', { categoryCount: Object.keys(categories).length, linkCount: links.length });
        }
        // 读取链接数据
        async function loadLinks() {
            const headers = {
                'Content-Type': 'application/json'
            };
            // 如果已登录，从 localStorage 获取 token 并添加到请求头
            if (isLoggedIn) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    headers['Authorization'] = token;
                }
            }
            try {
                const response = await fetch('/api/getLinks?userId=testUser', {
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error("HTTP error! status: " + response.status);
                }
                const data = await response.json();
                console.log('Received data:', data);
                if (data.categories) {
                    Object.assign(categories, data.categories);
                }
                publicLinks = data.links ? data.links.filter(link => !link.isPrivate) : [];
                privateLinks = data.links ? data.links.filter(link => link.isPrivate) : [];
                links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
                loadSections();
                updateCategorySelect();
                updateUIState();
                logAction('读取链接', {
                    publicCount: publicLinks.length,
                    privateCount: privateLinks.length,
                    isLoggedIn: isLoggedIn,
                    hasToken: !!localStorage.getItem('authToken')
                });
            } catch (error) {
                console.error('Error loading links:', error);
                alert('加载链接时出错，请刷新页面重试');
            }
        }
        // 更新UI状态
        function updateUIState() {
            const passwordInput = document.getElementById('admin-password');
            const adminBtn = document.getElementById('admin-mode-btn');
            const secretGardenBtn = document.getElementById('secret-garden-btn');
            const addRemoveControls = document.querySelector('.add-remove-controls');
            passwordInput.style.display = isLoggedIn ? 'none' : 'inline-block';
            secretGardenBtn.textContent = isLoggedIn ? "退出" : "登录";
            secretGardenBtn.style.display = 'inline-block';
            if (isAdmin) {
                adminBtn.textContent = "离开设置";
                adminBtn.style.display = 'inline-block';
                addRemoveControls.style.display = 'flex';
            } else if (isLoggedIn) {
                adminBtn.textContent = "设置";
                adminBtn.style.display = 'inline-block';
                addRemoveControls.style.display = 'none';
            } else {
                adminBtn.style.display = 'none';
                addRemoveControls.style.display = 'none';
            }
            logAction('更新UI状态', { isAdmin, isLoggedIn });
        }
        // 登录状态显示（加载所有链接）
        function showSecretGarden() {
            if (isLoggedIn) {
                links = [...publicLinks, ...privateLinks];
                loadSections();
                // 显示所有私密标签
                document.querySelectorAll('.private-tag').forEach(tag => {
                    tag.style.display = 'block';
                });
                logAction('显示私密花园');
            }
        }
        // 分类初始化设置
        function loadSections() {
            const scrollPosition = Math.max(window.scrollY, 0);
            const container = document.getElementById('sections-container');
            container.innerHTML = '';
            Object.keys(categories).forEach(category => {
                const section = document.createElement('div');
                section.className = 'section';
                const titleContainer = document.createElement('div');
                titleContainer.className = 'section-title-container';
                const title = document.createElement('div');
                title.className = 'section-title';
                title.textContent = category;
                // 创建箭头标识
                const arrow = document.createElement('span');
                arrow.className = 'category-arrow';
                arrow.style.display = 'inline-block'; // 默认显示箭头
                titleContainer.appendChild(title);
                titleContainer.appendChild(arrow);
                // 创建卡片容器
                const cardContainer = document.createElement('div');
                cardContainer.className = 'card-container';
                cardContainer.id = category;
                section.appendChild(titleContainer);
                section.appendChild(cardContainer);
                // 检查 localStorage 中的状态
                const storedState = localStorage.getItem(category);
                const isCollapsed = storedState === 'collapsed';
                // 根据状态设置卡片显示与箭头方向
                cardContainer.style.display = isCollapsed ? 'none' : 'flex';
                arrow.textContent = isCollapsed ? '▲' : ''; // 收缩时显示 "▲"，展开时显示 ""
                // 渲染分类的链接
                const categoryLinks = links.filter(link => link.category === category);
                categoryLinks.forEach(link => {
                    createCard(link, cardContainer);
                });
                container.appendChild(section);
                // 点击标题切换展开/收缩
                title.onclick = () => {
                    const isCurrentlyCollapsed = cardContainer.style.display === 'none';
                    // 切换箭头和卡片容器的显示状态
                    cardContainer.style.display = isCurrentlyCollapsed ? 'flex' : 'none';
                    arrow.textContent = isCurrentlyCollapsed ? '' : '▲';
                    // 保存展开/收缩状态到 localStorage
                    localStorage.setItem(category, isCurrentlyCollapsed ? 'expanded' : 'collapsed');
                    logAction(isCurrentlyCollapsed ? '展开分类' : '收缩分类', { category });
                };
                if (isAdmin) {
                    // 添加删除分类按钮
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '删除分类';
                    deleteBtn.className = 'delete-category-btn';
                    deleteBtn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
                    deleteBtn.onclick = () => deleteCategory(category);
                    titleContainer.appendChild(deleteBtn);
                    // 添加修改分类按钮
                    const editBtn = document.createElement('button');
                    editBtn.textContent = '修改分类名';
                    editBtn.className = 'edit-category-btn';
                    editBtn.style.display = isRemoveCategoryMode ? 'none' : 'inline-block';
                    editBtn.onclick = () => editCategory(category);
                    titleContainer.appendChild(editBtn);
                }
            });
            window.scrollTo(0, scrollPosition);
            logAction('加载分类和链接', {
                isAdmin: isAdmin,
                linkCount: links.length,
                categoryCount: Object.keys(categories).length
            });
        }
        // 创建卡片
        function createCard(link, container) {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('draggable', isAdmin);
            card.dataset.isPrivate = link.isPrivate;
            const cardTop = document.createElement('div');
            cardTop.className = 'card-top';
            // 定义默认的 SVG 图标
            const defaultIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>' +
                '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' +
                '</svg>';
            // 创建图标元素
            const icon = document.createElement('img');
            icon.className = 'card-icon';
            // icon.src = 'https://api.iowen.cn/favicon/' + extractDomain(link.url) + '.png';
            //icon.src = 'https://www.faviconextractor.com/favicon/' + extractDomain(link.url);
            icon.src = 'https://getfavicon.377020945.xyz/?url=' + extractDomain(link.url);
            icon.alt = 'Website Icon';
            // 如果图片加载失败，使用默认的 SVG 图标
            icon.onerror = function () {
                const svgBlob = new Blob([defaultIconSVG], { type: 'image/svg+xml' });
                const svgUrl = URL.createObjectURL(svgBlob);
                this.src = svgUrl;
                this.onload = () => URL.revokeObjectURL(svgUrl);
            };
            function extractDomain(url) {
                let domain;
                try {
                    domain = new URL(url).hostname;
                } catch (e) {
                    domain = url;
                }
                return domain;
            }
            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = link.name;
            cardTop.appendChild(icon);
            cardTop.appendChild(title);
            const url = document.createElement('div');
            url.className = 'card-url';
            url.textContent = link.url;
            card.appendChild(cardTop);
            card.appendChild(url);
            if (link.isPrivate) {
                const privateTag = document.createElement('div');
                privateTag.className = 'private-tag';
                privateTag.textContent = '私密';
                card.appendChild(privateTag);
            }
            const correctedUrl = link.url.startsWith('http://') || link.url.startsWith('https://') ? link.url : 'http://' + link.url;
            if (!isAdmin) {
                card.addEventListener('click', () => {
                    window.open(correctedUrl, '_blank');
                    logAction('打开链接', { name: link.name, url: correctedUrl });
                });
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '–';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = function (event) {
                event.stopPropagation();
                removeCard(card);
            };
            card.appendChild(deleteBtn);
            updateCardStyle(card);
            card.addEventListener('dragstart', dragStart);
            card.addEventListener('dragover', dragOver);
            card.addEventListener('dragend', dragEnd);
            card.addEventListener('drop', drop);
            card.addEventListener('touchstart', touchStart, { passive: false });
            if (isAdmin && removeMode) {
                deleteBtn.style.display = 'block';
            }
            if (isAdmin || (link.isPrivate && isLoggedIn) || !link.isPrivate) {
                container.appendChild(card);
            }
            // logAction('创建卡片', { name: link.name, isPrivate: link.isPrivate });
        }
        // 更新卡片样式
        function updateCardStyle(card) {
            if (isDarkTheme) {
                card.style.backgroundColor = '#1e1e1e';
                card.style.color = '#ffffff';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
            } else {
                // 你可以根据不同条件设置卡片的颜色
                if (card.dataset.isPrivate === 'true') {
                    card.style.backgroundColor = '#f39c12';  // 私密卡片背景颜色
                } else {
                    card.style.backgroundColor = '#ecf0f1';  // 默认卡片背景颜色
                }
                card.style.color = '#333';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }
            // 你还可以设置其他样式
            card.style.border = '1px solid #ccc'; // 边框颜色
            card.style.padding = '10px'; // 内边距
            card.style.borderRadius = '5px'; // 圆角
        }
        // 更新分类选择下拉框
        function updateCategorySelect() {
            const categorySelect = document.getElementById('category-select');
            categorySelect.innerHTML = '';
            Object.keys(categories).forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
            logAction('更新分类选择', { categoryCount: Object.keys(categories).length });
        }
        // 保存链接数据
        async function saveLinks() {
            if (isAdmin && !(await validateToken())) {
                return;
            }
            let allLinks = [...publicLinks, ...privateLinks];
            try {
                await fetch('/api/saveOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        userId: 'testUser',
                        links: allLinks,
                        categories: categories
                    }),
                });
                logAction('保存链接', { linkCount: allLinks.length, categoryCount: Object.keys(categories).length });
            } catch (error) {
                logAction('保存链接失败', { error: error.message });
                alert('保存链接失败，请重试');
            }
        }
        // 添加卡片弹窗
        async function addLink() {
            if (!await validateToken()) {
                return;
            }
            const name = document.getElementById('name-input').value;
            const url = document.getElementById('url-input').value;
            const category = document.getElementById('category-select').value;
            const isPrivate = document.getElementById('private-checkbox').checked;
            if (name && url && category) {
                const newLink = { name, url, category, isPrivate };
                if (isPrivate) {
                    privateLinks.push(newLink);
                } else {
                    publicLinks.push(newLink);
                }
                links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
                if (isAdmin || (isPrivate && isLoggedIn) || !isPrivate) {
                    const container = document.getElementById(category);
                    if (container) {
                        createCard(newLink, container);
                    } else {
                        categories[category] = [];
                        renderCategories();
                    }
                }
                saveLinks();
                document.getElementById('name-input').value = '';
                document.getElementById('url-input').value = '';
                document.getElementById('private-checkbox').checked = false;
                hideAddDialog();
                logAction('添加卡片', { name, url, category, isPrivate });
            }
        }
        // 删除卡片
        async function removeCard(card) {
            if (!await validateToken()) {
                return;
            }
            const name = card.querySelector('.card-title').textContent;
            const url = card.querySelector('.card-url').textContent;
            const isPrivate = card.dataset.isPrivate === 'true';
            links = links.filter(link => link.url !== url);
            if (isPrivate) {
                privateLinks = privateLinks.filter(link => link.url !== url);
            } else {
                publicLinks = publicLinks.filter(link => link.url !== url);
            }
            for (const key in categories) {
                categories[key] = categories[key].filter(link => link.url !== url);
            }
            card.remove();
            saveLinks();
            logAction('删除卡片', { name, url, isPrivate });
        }
        // 拖拽卡片
        let draggedCard = null;
        let touchStartX, touchStartY;
        // 触屏端拖拽卡片
        function touchStart(event) {
            if (!isAdmin) {
                return;
            }
            draggedCard = event.target.closest('.card');
            if (!draggedCard) return;
            event.preventDefault();
            const touch = event.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            draggedCard.classList.add('dragging');
            document.addEventListener('touchmove', touchMove, { passive: false });
            document.addEventListener('touchend', touchEnd);
        }
        function touchMove(event) {
            if (!draggedCard) return;
            event.preventDefault();
            const touch = event.touches[0];
            const currentX = touch.clientX;
            const currentY = touch.clientY;
            const deltaX = currentX - touchStartX;
            const deltaY = currentY - touchStartY;
            draggedCard.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";
            const target = findCardUnderTouch(currentX, currentY);
            if (target && target !== draggedCard) {
                const container = target.parentElement;
                const targetRect = target.getBoundingClientRect();
                if (currentX < targetRect.left + targetRect.width / 2) {
                    container.insertBefore(draggedCard, target);
                } else {
                    container.insertBefore(draggedCard, target.nextSibling);
                }
            }
        }
        function touchEnd(event) {
            if (!draggedCard) return;
            const card = draggedCard;
            const targetCategory = card.closest('.card-container').id;
            validateToken().then(isValid => {
                if (isValid && card) {
                    updateCardCategory(card, targetCategory);
                    saveCardOrder().catch(error => {
                        console.error('Save failed:', error);
                    });
                }
                cleanupDragState();
            });
        }
        function findCardUnderTouch(x, y) {
            const cards = document.querySelectorAll('.card:not(.dragging)');
            return Array.from(cards).find(card => {
                const rect = card.getBoundingClientRect();
                return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
            });
        }
        // PC端拖拽卡片
        function dragStart(event) {
            if (!isAdmin) {
                event.preventDefault();
                return;
            }
            draggedCard = event.target.closest('.card');
            if (!draggedCard) return;
            draggedCard.classList.add('dragging');
            event.dataTransfer.effectAllowed = "move";
            logAction('开始拖拽卡片', { name: draggedCard.querySelector('.card-title').textContent });
        }
        function dragOver(event) {
            if (!isAdmin) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            const target = event.target.closest('.card');
            if (target && target !== draggedCard) {
                const container = target.parentElement;
                const mousePositionX = event.clientX;
                const targetRect = target.getBoundingClientRect();
                if (mousePositionX < targetRect.left + targetRect.width / 2) {
                    container.insertBefore(draggedCard, target);
                } else {
                    container.insertBefore(draggedCard, target.nextSibling);
                }
            }
        }
        // 清理拖拽状态函数
        function cleanupDragState() {
            if (draggedCard) {
                draggedCard.classList.remove('dragging');
                draggedCard.style.transform = '';
                draggedCard = null;
            }
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', touchEnd);
            touchStartX = null;
            touchStartY = null;
        }
        // PC端拖拽结束
        function drop(event) {
            if (!isAdmin) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            const card = draggedCard;
            const targetCategory = event.target.closest('.card-container').id;
            validateToken().then(isValid => {
                if (isValid && card) {
                    updateCardCategory(card, targetCategory);
                    saveCardOrder().catch(error => {
                        console.error('Save failed:', error);
                    });
                }
                cleanupDragState();
            });
        }
        function dragEnd(event) {
            if (draggedCard) {
                draggedCard.classList.remove('dragging');
                logAction('拖拽卡片结束');
            }
        }
        // 更新卡片分类
        function updateCardCategory(card, newCategory) {
            const cardTitle = card.querySelector('.card-title').textContent;
            const cardUrl = card.querySelector('.card-url').textContent;
            const isPrivate = card.dataset.isPrivate === 'true';
            const linkIndex = links.findIndex(link => link.url === cardUrl);
            if (linkIndex !== -1) {
                links[linkIndex].category = newCategory;
            }
            const linkArray = isPrivate ? privateLinks : publicLinks;
            const arrayIndex = linkArray.findIndex(link => link.url === cardUrl);
            if (arrayIndex !== -1) {
                linkArray[arrayIndex].category = newCategory;
            }
            card.dataset.category = newCategory;
        }
        // 在页面加载完成后添加触摸事件监听器
        document.addEventListener('DOMContentLoaded', function () {
            const cardContainers = document.querySelectorAll('.card-container');
            cardContainers.forEach(container => {
                container.addEventListener('touchstart', touchStart, { passive: false });
            });
        });
        // 保存卡片顺序
        async function saveCardOrder() {
            if (!await validateToken()) {
                return;
            }
            const containers = document.querySelectorAll('.card-container');
            let newPublicLinks = [];
            let newPrivateLinks = [];
            let newCategories = {};
            containers.forEach(container => {
                const category = container.id;
                newCategories[category] = [];
                [...container.children].forEach(card => {
                    const url = card.querySelector('.card-url').textContent;
                    const name = card.querySelector('.card-title').textContent;
                    const isPrivate = card.dataset.isPrivate === 'true';
                    card.dataset.category = category;
                    const link = { name, url, category, isPrivate };
                    if (isPrivate) {
                        newPrivateLinks.push(link);
                    } else {
                        newPublicLinks.push(link);
                    }
                    newCategories[category].push(link);
                });
            });
            publicLinks.length = 0;
            publicLinks.push(...newPublicLinks);
            privateLinks.length = 0;
            privateLinks.push(...newPrivateLinks);
            Object.keys(categories).forEach(key => delete categories[key]);
            Object.assign(categories, newCategories);
            logAction('保存卡片顺序', {
                publicCount: newPublicLinks.length,
                privateCount: newPrivateLinks.length,
                categoryCount: Object.keys(newCategories).length
            });
            try {
                const response = await fetch('/api/saveOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        userId: 'testUser',
                        links: [...newPublicLinks, ...newPrivateLinks],
                        categories: newCategories
                    }),
                });
                const result = await response.json();
                if (!result.success) {
                    throw new Error('Failed to save order');
                }
                logAction('保存卡片顺序', { publicCount: newPublicLinks.length, privateCount: newPrivateLinks.length, categoryCount: Object.keys(newCategories).length });
            } catch (error) {
                logAction('保存顺序失败', { error: error.message });
                alert('保存顺序失败，请重试');
            }
        }
        // 设置状态重新加载卡片
        function reloadCardsAsAdmin() {
            document.querySelectorAll('.card-container').forEach(container => {
                container.innerHTML = '';
            });
            loadLinks().then(() => {
                if (isDarkTheme) {
                    applyDarkTheme();
                }
            });
            logAction('重新加载卡片（管理员模式）');
        }
        // 密码输入框回车事件
        document.getElementById('admin-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                toggleSecretGarden();
            }
        });
        // 切换设置状态
        async function toggleAdminMode() {
            const adminBtn = document.getElementById('admin-mode-btn');
            const addRemoveControls = document.querySelector('.add-remove-controls');
            if (!isAdmin && isLoggedIn) {
                if (!await validateToken()) {
                    return;
                }
                // 在进入设置模式之前进行备份
                try {
                    const response = await fetch('/api/backupData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('authToken')
                        },
                        body: JSON.stringify({
                            sourceUserId: 'testUser',
                            backupUserId: 'backup'
                        }),
                    });
                    const result = await response.json();
                    if (result.success) {
                        logAction('数据备份成功');
                    } else {
                        throw new Error('备份失败');
                    }
                } catch (error) {
                    logAction('数据备份失败', { error: error.message });
                    if (!confirm('备份失败，是否仍要继续进入设置模式？')) {
                        return;
                    }
                }
                isAdmin = true;
                adminBtn.textContent = "退出设置";
                addRemoveControls.style.display = 'flex';
                //alert('准备设置分类和书签');
                reloadCardsAsAdmin();
                logAction('进入设置');
            } else if (isAdmin) {
                isAdmin = false;
                removeMode = false;
                adminBtn.textContent = "设  置";
                addRemoveControls.style.display = 'none';
                //alert('设置已保存');
                reloadCardsAsAdmin();
                logAction('离开设置');
            }
            updateUIState();
        }
        // 切换到登录状态
        function toggleSecretGarden() {
            const passwordInput = document.getElementById('admin-password');
            if (!isLoggedIn) {
                verifyPassword(passwordInput.value)
                    .then(result => {
                        if (result.valid) {
                            isLoggedIn = true;
                            localStorage.setItem('authToken', result.token);
                            console.log('Token saved:', result.token);
                            loadLinks();
                            //alert('登录成功！');
                            logAction('登录成功');
                        } else {
                            alert('密码错误');
                            logAction('登录失败', { reason: result.error || '密码错误' });
                        }
                        updateUIState();
                    })
                    .catch(error => {
                        console.error('Login error:', error);
                        alert('登录过程出错，请重试');
                    });
            } else {
                isLoggedIn = false;
                isAdmin = false;
                localStorage.removeItem('authToken');
                links = publicLinks;
                loadSections();
                alert('退出登录！');
                updateUIState();
                passwordInput.value = '';
                logAction('退出登录');
            }
        }
        // 应用暗色主题
        function applyDarkTheme() {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#ffffff';
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.backgroundColor = '#1e1e1e';
                card.style.color = '#ffffff';
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
            });
            logAction('应用暗色主题');
        }
        // 显示添加链接对话框
        function showAddDialog() {
            document.getElementById('dialog-overlay').style.display = 'flex';
            logAction('显示添加链接对话框');
        }
        // 隐藏添加链接对话框
        function hideAddDialog() {
            document.getElementById('dialog-overlay').style.display = 'none';
            logAction('隐藏添加链接对话框');
        }
        // 切换删除卡片模式
        function toggleRemoveMode() {
            removeMode = !removeMode;
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(btn => {
                btn.style.display = removeMode ? 'block' : 'none';
            });
            logAction('切换删除卡片模式', { removeMode });
        }
        // 切换删除分类模式
        function toggleRemoveCategory() {
            isRemoveCategoryMode = !isRemoveCategoryMode;
            // 获取删除和修改按钮
            const deleteButtons = document.querySelectorAll('.delete-category-btn');
            const editButtons = document.querySelectorAll('.edit-category-btn'); // 获取“修改分类”按钮
            // 控制删除按钮的显示状态
            deleteButtons.forEach(btn => {
                btn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
            });
            // 控制修改按钮的显示状态
            editButtons.forEach(btn => {
                btn.style.display = !isRemoveCategoryMode ? 'inline-block' : 'none';
            });
            logAction('切换删除分类模式', { isRemoveCategoryMode });
        }
        // 切换主题
        function toggleTheme() {
            isDarkTheme = !isDarkTheme;
            document.body.style.backgroundColor = isDarkTheme ? '#121212' : '#e8f4ea';
            document.body.style.color = isDarkTheme ? '#ffffff' : '#333';
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.backgroundColor = isDarkTheme ? '#1e1e1e' : '#b8c9d9';
                card.style.color = isDarkTheme ? '#ffffff' : '#333';
                card.style.boxShadow = isDarkTheme
                    ? '0 4px 8px rgba(0, 0, 0, 0.5)'
                    : '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
            const searchpage = document.querySelectorAll('.searchpage');
            searchpage.forEach(element => {
                element.style.backgroundColor = isDarkTheme ? '#121212' : '#e8f4ea';
                element.style.color = isDarkTheme ? '#ffffff' : '#333';
            });
            const dialogBox = document.getElementById('dialog-box');
            dialogBox.style.backgroundColor = isDarkTheme ? '#1e1e1e' : '#ffffff';
            dialogBox.style.color = isDarkTheme ? '#ffffff' : '#333';
            const inputs = document.querySelectorAll('input[type="text"], input[type="password"], select');
            inputs.forEach(input => {
                input.style.backgroundColor = isDarkTheme ? '#444' : '#fff';
                input.style.color = isDarkTheme ? '#fff' : '#333';
                input.style.borderColor = isDarkTheme ? '#555' : '#ccc';
            });
            logAction('切换主题', { isDarkTheme });
        }
        // 验证密码
        async function verifyPassword(inputPassword) {
            const response = await fetch('/api/verifyPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: inputPassword }),
            });
            const result = await response.json();
            return result;
        }
        // 初始化加载
        document.addEventListener('DOMContentLoaded', async () => {
            await validateToken();
            loadLinks();
        });
        // 前端检查是否有 token
        async function validateToken() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                isLoggedIn = false;
                updateUIState();
                return false;
            }
            try {
                const response = await fetch('/api/getLinks?userId=testUser', {
                    headers: { 'Authorization': token }
                });
                if (response.status === 401) {
                    //await resetToLoginState('token已过期，请重新登录');
                    return false;
                }
                isLoggedIn = true;
                updateUIState();
                return true;
            } catch (error) {
                console.error('Token validation error:', error);
                return false;
            }
        }
        // 重置状态
        async function resetToLoginState(message) {
            alert(message);
            cleanupDragState();
            localStorage.removeItem('authToken');
            isLoggedIn = false;
            isAdmin = false;
            removeMode = false;
            isRemoveCategoryMode = false;
            const passwordInput = document.getElementById('admin-password');
            if (passwordInput) {
                passwordInput.value = '';
            }
            updateUIState();
            links = publicLinks;
            loadSections();
            const addRemoveControls = document.querySelector('.add-remove-controls');
            if (addRemoveControls) {
                addRemoveControls.style.display = 'none';
            }
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.style.display = 'none';
            });
            document.querySelectorAll('.delete-category-btn').forEach(btn => {
                btn.style.display = 'none';
            });
            const dialogOverlay = document.getElementById('dialog-overlay');
            if (dialogOverlay) {
                dialogOverlay.style.display = 'none';
            }
        }
    </script>
</body>
</html>
`;
// 服务端 token 验证
async function validateServerToken(authToken, env) {
if (!authToken) {
return {
isValid: false,
status: 401,
response: { error: 'Unauthorized', message: '未登录或登录已过期' }
};
}
try {
const [timestamp, hash] = authToken.split('.');
const tokenTimestamp = parseInt(timestamp);
const now = Date.now();
const FIFTEEN_MINUTES = 15 * 60 * 1000;
if (now - tokenTimestamp > FIFTEEN_MINUTES) {
return {
isValid: false,
status: 401,
response: {
error: 'Token expired',
tokenExpired: true,
//message: '登录已过期，请重新登录'
}
};
}
const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
const encoder = new TextEncoder();
const data = encoder.encode(tokenData);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const expectedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
if (hash !== expectedHash) {
return {
isValid: false,
status: 401,
response: {
error: 'Invalid token',
tokenInvalid: true,
message: '登录状态无效，请重新登录'
}
};
}
return { isValid: true };
} catch (error) {
return {
isValid: false,
status: 401,
response: {
error: 'Invalid token',
tokenInvalid: true,
message: '登录验证失败，请重新登录'
}
};
}
}
export default {
async fetch(request, env) {
const url = new URL(request.url);
if (url.pathname === '/') {
return new Response(HTML_CONTENT, {
headers: { 'Content-Type': 'text/html' }
});
}
if (url.pathname === '/api/getLinks') {
const userId = url.searchParams.get('userId');
const authToken = request.headers.get('Authorization');
const data = await env.CARD_ORDER.get(userId);
if (data) {
const parsedData = JSON.parse(data);
// 验证 token
if (authToken) {
const validation = await validateServerToken(authToken, env);
if (!validation.isValid) {
return new Response(JSON.stringify(validation.response), {
status: validation.status,
headers: { 'Content-Type': 'application/json' }
});
}
// Token 有效，返回完整数据
return new Response(JSON.stringify(parsedData), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}
// 未提供 token，只返回公开数据
const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
const filteredCategories = {};
Object.keys(parsedData.categories).forEach(category => {
filteredCategories[category] = parsedData.categories[category].filter(link => !link.isPrivate);
});
return new Response(JSON.stringify({
links: filteredLinks,
categories: filteredCategories
}), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}
return new Response(JSON.stringify({
links: [],
categories: {}
}), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}
if (url.pathname === '/api/saveOrder' && request.method === 'POST') {
const authToken = request.headers.get('Authorization');
const validation = await validateServerToken(authToken, env);
if (!validation.isValid) {
return new Response(JSON.stringify(validation.response), {
status: validation.status,
headers: { 'Content-Type': 'application/json' }
});
}
const { userId, links, categories } = await request.json();
await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories }));
return new Response(JSON.stringify({
success: true,
message: '保存成功'
}), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}
if (url.pathname === '/api/verifyPassword' && request.method === 'POST') {
try {
const { password } = await request.json();
const isValid = password === env.ADMIN_PASSWORD;
if (isValid) {
// 生成包含时间戳的加密 token
const timestamp = Date.now();
const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
const encoder = new TextEncoder();
const data = encoder.encode(tokenData);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
// 使用指定格式：timestamp.hash
const token = timestamp + "." + btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
return new Response(JSON.stringify({
valid: true,
token: token
}), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}
return new Response(JSON.stringify({
valid: false,
error: 'Invalid password'
}), {
status: 403,
headers: { 'Content-Type': 'application/json' }
});
} catch (error) {
return new Response(JSON.stringify({
valid: false,
error: error.message
}), {
status: 500,
headers: { 'Content-Type': 'application/json' }
});
}
}
if (url.pathname === '/api/backupData' && request.method === 'POST') {
const { sourceUserId } = await request.json();
const result = await this.backupData(env, sourceUserId);
return new Response(JSON.stringify(result), {
status: result.success ? 200 : 404,
headers: { 'Content-Type': 'application/json' }
});
}
return new Response('Not Found', { status: 404 });
},
async backupData(env, sourceUserId) {
const MAX_BACKUPS = 10;
const sourceData = await env.CARD_ORDER.get(sourceUserId);
if (sourceData) {
try {
const currentDate = new Date().toLocaleString('zh-CN', {
timeZone: 'Asia/Shanghai',
year: 'numeric',
month: '2-digit',
day: '2-digit',
hour: '2-digit',
minute: '2-digit',
second: '2-digit',
hour12: false
}).replace(/\//g, '-');
const backupId = `backup_${currentDate}`;
const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
const backupKeys = backups.keys.map(key => key.name).sort((a, b) => {
const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
return timeB - timeA; // 降序排序，最新的在前
});
await env.CARD_ORDER.put(backupId, sourceData);
const allBackups = [...backupKeys, backupId].sort((a, b) => {
const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
return timeB - timeA;
});
const backupsToDelete = allBackups.slice(MAX_BACKUPS);
if (backupsToDelete.length > 0) {
await Promise.all(
backupsToDelete.map(key => env.CARD_ORDER.delete(key))
);
}
return {
success: true,
backupId,
remainingBackups: MAX_BACKUPS,
deletedCount: backupsToDelete.length
};
} catch (error) {
return {
success: false,
error: 'Backup operation failed',
details: error.message
};
}
}
return { success: false, error: 'Source data not found' };
}
};
