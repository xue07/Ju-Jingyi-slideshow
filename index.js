
//开始设置监听window，等待页面加载完
window.addEventListener('load', function () {

    //封装个动画函数方便使用,使用定时器完成
    // 记得给传入需要做动画的参数添加定位
    function animate(obj, target, callback) {
        //先清除以前的定时器，只保留当前一个定时器，防止点击多次
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长值写到定时器里面
            //把步长值改为整数，不出现小数点，注意可能为负值
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                //停止动画，本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                if (callback) {
                    callback();
                }
            }
            // 把每次步长值改为一个慢慢变小的值 步长公式:(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    };


    let lunbotu = this.document.querySelector('.lunbotu');
    let circle_left = this.document.querySelector('.icon-circle-left');
    let circle_right = this.document.querySelector('.icon-circle-right');

    let img = this.document.querySelector('img');
    let imgWidth = img.offsetWidth;
    //鼠标移入显示左右箭头按钮，移出则隐藏
    lunbotu.addEventListener('mouseenter', function () {
        circle_left.style.display = "block";
        circle_right.style.display = "block";
        clearInterval(lunbo);
        lunbo = null;
    })
    lunbotu.addEventListener('mouseleave', function () {
        circle_left.style.display = "none";
        circle_right.style.display = "none";
        lunbo = setInterval(function () {
            circle_right.click();
        }, 2000);
    })
    //动态生成小圆圈，有几张就生成几个
    let ul = lunbotu.querySelector('ul');
    let ol = lunbotu.querySelector('.circle_ol');
    console.log(ul.children.length);

    let circle = 0;   //circle控制小圆圈的播放
    let num = 0;     //num为控制左右箭头播放图

    for (var i = 0; i < ul.children.length; i++) {
        //使用createElement每次循环都创建小li
        let li = this.document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来完成
        li.setAttribute('index', i);

        //把小li 使用apppendchild添加到ol里
        ol.appendChild(li);
        ol.children[0].className = 'dot_colors';
        li.addEventListener('mouseenter', function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'dot_colors';
            //点击小圆圈移动图片，移动的是ul
            //ul移动的距离是小圆圈的索引号 乘以 图片宽度，向左移动为负值
            // offsetWidth 属性是一个只读属性，它返回该元素的像素宽度
            //点击了某个li，能拿到当前小li的索引号
            let index = this.getAttribute('index');
            // console.log(index);
            circle = index;
            num = index;
            // console.log(imgWidth);
            let target = -index * imgWidth;
            //调用动画函数
            animate(ul, -index * imgWidth);
        });
    };

    //克隆li第一张图片放ul最后面,克隆的li放在生成小圆圈代码后面，这样不会产生多出克隆的小圆圈          
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //节流阀，防止连续点击播放过快
    let flag = true;
    //每点击箭头按钮，图片滚动一张
    circle_left.addEventListener('click', function () {

        if (flag) {
            flag = false; //关闭节流
            // console.log(num);
            //如果走到第一张，ul 要快速跳到最后 left改为最后一张的值，num重赋值为最后一个
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * imgWidth + 'px';
                // console.log(-(ul.children.length - 1) * imgWidth);
                num = ul.children.length - 1
            }
            num--;
            animate(ul, -num * imgWidth, function () {
                flag = true;
            });


            //点击左侧按钮，小圆圈跟随一起变化，可以声明个变量控制小圆圈播放
            if (circle == 0) {
                circle = ul.children.length - 1;
            }
            circle--;
            currentColor()
        };
    })

    circle_right.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流

            //如果走到最后复制的一张图，ul 要快速复原 left改为0，num重赋值0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0
            }
            num++;
            animate(ul, -num * imgWidth, function () {
                flag = true;
            });
            //点击右侧按钮，小圆圈跟随一起变化，可以声明个变量控制小圆圈播放
            circle++;
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            currentColor()
        }
    })

    function currentColor() {
        //先清除其他小圆圈的样式 dot_colors类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前小圆圈的样式
        ol.children[circle].className = 'dot_colors';
    }
    //自动轮播定时器
    let lunbo = setInterval(function () {
        circle_right.click();
    }, 2000);

});