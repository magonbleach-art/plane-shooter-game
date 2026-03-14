/**
 * 🛡️ OpenClaw 生肖进化全书 (Zodiac Evolution Codex)
 * 定义 12 生肖的攻击特效、觉醒技能及其视觉表现
 */

// ========== 3A级绘制工具函数 ==========

window.drawEnergyCore = function(ctx, x, y, radius, color) {
    ctx.save();
    ctx.globalAlpha = 0.2; ctx.strokeStyle = color; ctx.lineWidth = 2;
    for(let i=0; i<3; i++) {
        const r = radius * (1.5 + i * 0.2 + Math.sin(Date.now()*0.005 + i)*0.1);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
    for(let i=3; i>0; i--) {
        ctx.shadowBlur = 15 * i; ctx.shadowColor = color;
        const grad = ctx.createRadialGradient(x, y, radius * 0.2 * i, x, y, radius * i);
        grad.addColorStop(0, color); grad.addColorStop(0.5, color + "88"); grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(x, y, radius * i, 0, Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 20; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, radius * 0.4, 0, Math.PI*2); ctx.fill();
    ctx.restore();
};

window.drawSkeleton = function(ctx, x1, y1, x2, y2, color) {
    ctx.save(); ctx.strokeStyle = "#444"; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
};

window.drawArmor = function(ctx, points, color) {
    ctx.save(); ctx.shadowBlur = 10; ctx.shadowColor = "rgba(0,0,0,0.5)";
    const grad = ctx.createLinearGradient(points[0].x, points[0].y, points[2].x, points[2].y);
    grad.addColorStop(0, "#1a1a1e"); grad.addColorStop(0.5, "#3a3a40"); grad.addColorStop(1, "#2a2a2e");
    ctx.fillStyle = grad; ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
    for(let i=1; i<points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
};

/**
 * 🔫 生肖武器设计 (Zodiac Weapon Designs)
 * 每个生肖子弹现在拥有：
 * 1. 独特形状 (Shape)
 * 2. 动态特效 (Dynamic FX: 旋转、脉冲、拖尾)
 * 3. 差异化颜色 (Distinct Color)
 */
(function() {
    window.ZODIAC_DESIGNS = {
        rat: {
            name: "子鼠 · 灵动", color: "#e0e0e0",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.rotate(bullet.frameCount * 0.1);
                ctx.fillStyle = "#e0e0e0"; ctx.shadowBlur = 15; ctx.shadowColor = "#e0e0e0";
                // 核心形状：两层叠箭
                ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, 0); ctx.lineTo(-5, 6); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-11, -6); ctx.lineTo(-8, 0); ctx.lineTo(-11, 6); ctx.closePath(); ctx.fill();
                // 绘制干扰力场
                ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(0, 0, 12 + Math.sin(bullet.frameCount*0.2)*3, 0, Math.PI*2); ctx.stroke();
                ctx.restore();
            }
        },
        ox: {
            name: "丑牛 · 蛮力", color: "#8d6e63",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.fillStyle = "#8d6e63"; ctx.shadowBlur = 20; ctx.shadowColor = "#8d6e63";
                // 核心形状：巨大的工字型重锤
                ctx.fillRect(-12, -15, 24, 8); // 前部
                ctx.fillRect(-4, -7, 8, 20);   // 连接
                ctx.fillRect(-10, 13, 20, 4);  // 尾部
                ctx.fillStyle = "#ffd700"; ctx.fillRect(-2, -15, 4, 30); // 能量脊柱
                // 推进尾焰
                const grad = ctx.createLinearGradient(0, 15, 0, 35);
                grad.addColorStop(0, "#ff4500"); grad.addColorStop(1, "transparent");
                ctx.fillStyle = grad; ctx.beginPath(); ctx.moveTo(-10, 15); ctx.lineTo(10, 15); ctx.lineTo(0, 35); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
        },
        tiger: {
            name: "寅虎 · 散杀", color: "#ff9800",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                const scale = 1 + bullet.lifeTime * 0.01;
                ctx.scale(scale, scale);
                ctx.fillStyle = "#ff9800"; ctx.shadowBlur = 15; ctx.shadowColor = "#ff9800";
                // 核心形状：三叉戟杀伤弹
                ctx.beginPath(); 
                ctx.moveTo(18, 0); ctx.lineTo(8, -8); ctx.lineTo(10, -2); ctx.lineTo(-10, -2); ctx.lineTo(-10, 2); ctx.lineTo(10, 2); ctx.lineTo(8, 8); ctx.closePath(); 
                ctx.fill();
                // 黑色虎纹
                ctx.fillStyle = "#000"; ctx.fillRect(2, -2, 2, 4); ctx.fillRect(-4, -2, 2, 4);
                ctx.restore();
            }
        },
        rabbit: {
            name: "卯兔 · 幻影", color: "#f06292",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                const alpha = 0.5 + Math.sin(bullet.frameCount*0.2)*0.3;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = "#f06292"; ctx.shadowBlur = 15; ctx.shadowColor = "#f06292";
                // 核心形状：菱形核心 + 卫星环
                ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(0, -8); ctx.lineTo(-12, 0); ctx.lineTo(0, 8); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
                ctx.beginPath(); ctx.arc(0, 0, 16, bullet.frameCount*0.1, bullet.frameCount*0.1 + Math.PI*2); ctx.stroke();
                ctx.restore();
            }
        },
        dragon: {
            name: "辰龙 · 龙威", color: "#ffd700",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                ctx.shadowBlur = 25; ctx.shadowColor = "#ffd700";
                // 核心形状：修长的龙首飞弹
                const grad = ctx.createLinearGradient(15, 0, -20, 0);
                grad.addColorStop(0, "#fff"); grad.addColorStop(0.5, "#ffd700"); grad.addColorStop(1, "rgba(255,215,0,0)");
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(-20, -10); ctx.lineTo(-15, 0); ctx.lineTo(-20, 10); ctx.closePath(); ctx.fill();
                // 龙眼点缀
                ctx.fillStyle = "#f00"; ctx.beginPath(); ctx.arc(10, -3, 2, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        },
        snake: {
            name: "巳蛇 · 幽毒", color: "#4caf50",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                ctx.rotate(Math.sin(bullet.frameCount*0.15)*0.3);
                const grad = ctx.createLinearGradient(0, -18, 0, 18);
                grad.addColorStop(0, "#aaffaa"); grad.addColorStop(0.5, "#4caf50"); grad.addColorStop(1, "#1b5e20");
                ctx.fillStyle = grad; 
                // 核心形状：弯曲的蛇形弹头
                ctx.beginPath(); ctx.moveTo(0, 15); ctx.bezierCurveTo(10, 5, -10, -5, 0, -15); ctx.lineWidth = 4; ctx.strokeStyle = grad; ctx.stroke();
                // 毒牙
                ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.moveTo(0, 15); ctx.lineTo(-3, 10); ctx.lineTo(3, 10); ctx.fill();
                ctx.restore();
            }
        },
        horse: {
            name: "午马 · 极光", color: "#2196f3",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                ctx.shadowBlur = 20; ctx.shadowColor = "#00ffff";
                const h = 50 + bullet.speed;
                // 核心形状：闪电状的极光束
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(0, -h/2); ctx.lineTo(5, -h/4); ctx.lineTo(-5, 0); ctx.lineTo(5, h/4); ctx.lineTo(0, h/2); ctx.stroke();
                ctx.restore();
            }
        },
        goat: {
            name: "未羊 · 守护", color: "#ffffff",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.rotate(bullet.frameCount * 0.05);
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.shadowBlur = 15; ctx.shadowColor = "#fff";
                // 核心形状：圆角六角星（类似雪花）
                for(let i=0; i<6; i++) {
                    ctx.rotate(Math.PI/3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 12); ctx.stroke();
                    ctx.beginPath(); ctx.arc(0, 12, 3, 0, Math.PI*2); ctx.fill();
                }
                ctx.restore();
            }
        },
        monkey: {
            name: "申猴 · 顽劣", color: "#ffeb3b",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.rotate(bullet.frameCount*0.4);
                ctx.fillStyle = "#ffeb3b"; ctx.shadowBlur = 10;
                // 核心形状：不规则的手里剑
                ctx.beginPath(); 
                for(let i=0; i<4; i++) {
                    ctx.rotate(Math.PI/2); ctx.lineTo(15, 0); ctx.lineTo(3, 3);
                }
                ctx.closePath(); ctx.fill();
                ctx.restore();
            }
        },
        rooster: {
            name: "酉鸡 · 破晓", color: "#f44336",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.rotate(bullet.frameCount * 0.1);
                ctx.fillStyle = "#f44336"; ctx.shadowBlur = 20; ctx.shadowColor = "#ff0000";
                // 核心形状：放射状的太阳弹
                for(let i=0; i<8; i++) {
                    ctx.rotate(Math.PI/4); ctx.fillRect(0, -2, 16, 4);
                }
                ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        },
        dog: {
            name: "戌狗 · 忠诚", color: "#ffc107",
            attack_effect: (ctx, bullet) => {
                ctx.save(); ctx.fillStyle = "#ffc107"; ctx.shadowBlur = 15; ctx.shadowColor = "#ffc107";
                // 核心形状：带尖刺的圆环
                ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.stroke();
                for(let i=0; i<4; i++) {
                    ctx.rotate(Math.PI/2); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(14, 0); ctx.stroke();
                }
                // 卫星
                const a = bullet.frameCount*0.2;
                ctx.beginPath(); ctx.arc(Math.cos(a)*18, Math.sin(a)*18, 5, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        },
        pig: {
            name: "亥猪 · 洪荒", color: "#e91e63",
            attack_effect: (ctx, bullet) => {
                ctx.save(); 
                const pulse = Math.sin(bullet.frameCount*0.1)*5;
                // 核心形状：不断膨胀收缩的多重圆环
                ctx.strokeStyle = "#e91e63"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(0, 0, 12 + pulse, 0, Math.PI*2); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, 6 + pulse/2, 0, Math.PI*2); ctx.fillStyle = "#fff"; ctx.fill();
                ctx.restore();
            }
        }
    };

    window.CONSTELLATION_DESIGNS = {
        "Aries": {
            color: "#f44336", glow: "#ff5252", symbol: "♈",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                [-1, 1].forEach(side => { window.drawSkeleton(ctx, 0, 0, side * 60, -20, "#ff5252"); });
                window.drawArmor(ctx, [{x: -50, y: -30}, {x: 50, y: -30}, {x: 70, y: 10}, {x: 0, y: 50}, {x: -70, y: 10}], "#ff5252");
                window.drawEnergyCore(ctx, 0, 5, 28, "#ff5252");
                ctx.font = "bold 50px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♈", 0, 15);
                ctx.restore();
            }
        }
        // ... 其他星座绘制保持原样或在此简化 ...
    };

    // 补充其它星座的简化绘制以保证代码完整性
    const names = ["Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const symbols = ["♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
    const colors = ["#8d6e63", "#00bcd4", "#4caf50", "#ffc107", "#9c27b0", "#4caf50", "#9c27b0", "#2196f3", "#795548", "#00bcd4", "#3f51b5"];
    
    names.forEach((name, i) => {
        if (!window.CONSTELLATION_DESIGNS[name]) {
            window.CONSTELLATION_DESIGNS[name] = {
                color: colors[i], symbol: symbols[i],
                draw: (ctx, boss) => {
                    ctx.save(); window.drawEnergyCore(ctx, 0, 0, 35, colors[i]);
                    ctx.font = "bold 50px Arial"; ctx.textAlign="center"; ctx.fillStyle="#fff"; ctx.fillText(symbols[i], 0, 15);
                    ctx.restore();
                }
            };
        }
    });

    Object.keys(window.CONSTELLATION_DESIGNS).forEach(key => {
        const chineseName = { "Aries": "白羊宫", "Taurus": "金牛宫", "Gemini": "双子宫", "Cancer": "巨蟹宫", "Leo": "狮子宫", "Virgo": "处女宫", "Libra": "天秤宫", "Scorpio": "天蝎宫", "Sagittarius": "射手宫", "Capricorn": "摩羯宫", "Aquarius": "水瓶宫", "Pisces": "双鱼宫" }[key];
        if (chineseName) window.CONSTELLATION_DESIGNS[chineseName] = window.CONSTELLATION_DESIGNS[key];
    });
})();
