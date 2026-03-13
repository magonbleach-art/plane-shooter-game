/**
 * 🛡️ OpenClaw 生肖进化全书 (Zodiac Evolution Codex)
 * 定义 12 生肖的攻击特效、觉醒技能及其视觉表现
 */

// ========== 3A级绘制工具函数 ==========

/**
 * 绘制能量核心（三层渲染：内核、光晕、力场）
 */
window.drawEnergyCore = function(ctx, x, y, radius, color) {
    ctx.save();
    // 1. 外层力场 (Force Field)
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for(let i=0; i<3; i++) {
        const r = radius * (1.5 + i * 0.2 + Math.sin(Date.now()*0.005 + i)*0.1);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.stroke();
    }

    // 2. 中层光晕 (Glow)
    ctx.globalAlpha = 1.0;
    for(let i=3; i>0; i--) {
        ctx.shadowBlur = 15 * i;
        ctx.shadowColor = color;
        const grad = ctx.createRadialGradient(x, y, radius * 0.2 * i, x, y, radius * i);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, color + "88");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, radius * i, 0, Math.PI*2); ctx.fill();
    }

    // 3. 内核 (Core)
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(x, y, radius * 0.4, 0, Math.PI*2); ctx.fill();
    
    // 4. 核心脉冲
    const pulse = Math.abs(Math.sin(Date.now()*0.01)) * radius * 0.2;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, radius * 0.4 + pulse, 0, Math.PI*2); ctx.stroke();
    
    ctx.restore();
};

/**
 * 绘制机械骨架 (Mechanical Skeleton)
 */
window.drawSkeleton = function(ctx, x1, y1, x2, y2, color) {
    ctx.save();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.setLineDash([]);
    
    // 关节
    ctx.fillStyle = "#222";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x1, y1, 6, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x2, y2, 6, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.restore();
};

/**
 * 绘制重型装甲 (Heavy Armor)
 */
window.drawArmor = function(ctx, points, color) {
    ctx.save();
    // 阴影层
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowOffsetY = 5;
    
    // 金属渐变
    const grad = ctx.createLinearGradient(points[0].x, points[0].y, points[2].x, points[2].y);
    grad.addColorStop(0, "#1a1a1e");
    grad.addColorStop(0.5, "#3a3a40");
    grad.addColorStop(1, "#2a2a2e");
    
    ctx.fillStyle = grad;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i=1; i<points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 边缘高光
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
};

/**
 * 🔫 生肖武器设计 (Zodiac Weapon Designs)
 */
(function() {
    window.ZODIAC_DESIGNS = {
        rat: {
            name: "子鼠 · 灵动", color: "#e0e0e0",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#e0e0e0"; ctx.shadowBlur = 15; ctx.shadowColor = "#e0e0e0";
                // 绘制带力场的小弹头
                ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = "rgba(224, 224, 224, 0.3)"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI*2); ctx.stroke();
            }
        },
        ox: {
            name: "丑牛 · 蛮力", color: "#ff4b2b",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#ff4b2b"; ctx.shadowBlur = 15; ctx.shadowColor = "#ff4b2b";
                ctx.fillRect(-6, -6, 12, 12);
            }
        },
        tiger: {
            name: "寅虎 · 连杀", color: "#ff9800",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#ff9800"; ctx.beginPath();
                ctx.moveTo(0, -10); ctx.lineTo(-5, 5); ctx.lineTo(5, 5); ctx.closePath(); ctx.fill();
            }
        },
        rabbit: {
            name: "卯兔 · 幻影", color: "#f06292",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#f06292"; ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI*2); ctx.fill();
            }
        },
        dragon: {
            name: "辰龙 · 龙威", color: "#ffd700",
            attack_effect: (ctx, bullet) => {
                const grad = ctx.createLinearGradient(0, -10, 0, 10);
                grad.addColorStop(0, "#fff"); grad.addColorStop(1, "#ffd700");
                ctx.fillStyle = grad; ctx.fillRect(-4, -15, 8, 30);
            }
        },
        snake: {
            name: "巳蛇 · 幽毒", color: "#4caf50",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#4caf50"; ctx.beginPath(); ctx.ellipse(0, 0, 4, 10, 0, 0, Math.PI*2); ctx.fill();
            }
        },
        horse: {
            name: "午马 · 极光", color: "#2196f3",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#2196f3"; ctx.fillRect(-2, -20, 4, 40);
            }
        },
        goat: {
            name: "未羊 · 守护", color: "#ffffff",
            attack_effect: (ctx, bullet) => {
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.stroke();
            }
        },
        monkey: {
            name: "申猴 · 灵动", color: "#ffeb3b",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#ffeb3b"; ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI*2); ctx.fill();
            }
        },
        rooster: {
            name: "酉鸡 · 破晓", color: "#f44336",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#f44336"; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(-8, 8); ctx.lineTo(8, 8); ctx.closePath(); ctx.fill();
            }
        },
        dog: {
            name: "戌狗 · 忠诚", color: "#ffc107",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#ffc107"; ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
            }
        },
        pig: {
            name: "亥猪 · 洪荒", color: "#e91e63",
            attack_effect: (ctx, bullet) => {
                ctx.fillStyle = "#e91e63"; ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.fill();
            }
        }
    };

    window.CONSTELLATION_DESIGNS = {
        "Aries": {
            color: "#f44336", glow: "#ff5252", symbol: "♈",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 骨架 (Skeleton)
                [-1, 1].forEach(side => {
                    window.drawSkeleton(ctx, 0, 0, side * 60, -20, "#ff5252");
                    window.drawSkeleton(ctx, side * 60, -20, side * 80, 20, "#ff5252");
                });

                // 2. 装甲 (Armor)
                const armorPoints = [
                    {x: -50, y: -30}, {x: 50, y: -30}, {x: 70, y: 10}, 
                    {x: 0, y: 50}, {x: -70, y: 10}
                ];
                window.drawArmor(ctx, armorPoints, "#ff5252");

                // 3. 羊角 (Horn)
                [-1, 1].forEach(side => {
                    ctx.save(); ctx.translate(side * 40, -25); ctx.rotate(side * (0.3 + Math.sin(time) * 0.1));
                    ctx.strokeStyle = "#f44336"; ctx.lineWidth = 15;
                    ctx.beginPath(); ctx.arc(side * 20, -20, 40, Math.PI, Math.PI * 1.8, side === -1); ctx.stroke();
                    ctx.restore();
                });

                // 4. 内核 (Core)
                window.drawEnergyCore(ctx, 0, 5, 28, "#ff5252");
                
                // 5. 标识
                ctx.shadowBlur = 30; ctx.font = "bold 50px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♈", 0, 15);
                ctx.restore();
            }
        },
        "Taurus": {
            color: "#8d6e63", glow: "#ffd700", symbol: "♉",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 骨架
                [-1, 1].forEach(side => {
                    window.drawSkeleton(ctx, side * 20, 0, side * 70, -30, "#ffd700");
                });

                // 2. 装甲
                const armorPoints = [
                    {x: -60, y: -40}, {x: 60, y: -40}, {x: 80, y: 0}, 
                    {x: 60, y: 50}, {x: -60, y: 50}, {x: -80, y: 0}
                ];
                window.drawArmor(ctx, armorPoints, "#ffd700");

                // 3. 牛角
                [-1, 1].forEach(side => {
                    ctx.save(); ctx.translate(side * 50, -35); ctx.rotate(side * Math.sin(time) * 0.1);
                    ctx.shadowBlur = 20; ctx.shadowColor = "#ffd700"; ctx.strokeStyle = "#8d6e63"; ctx.lineWidth = 18;
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(side * 40, -50); ctx.lineTo(side * 20, -80); ctx.stroke();
                    ctx.restore();
                });

                // 4. 内核
                window.drawEnergyCore(ctx, 0, 5, 35, "#ffd700");
                ctx.shadowBlur = 40; ctx.font = "bold 55px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♉", 0, 15);
                ctx.restore();
            }
        },
        "Gemini": {
            color: "#00bcd4", glow: "#00ffff", symbol: "♊",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.003;
                [-1, 1].forEach(side => {
                    const offY = Math.sin(time + side * Math.PI) * 30; 
                    const offX = side * (50 + Math.cos(time) * 15);
                    ctx.save(); ctx.translate(offX, offY);
                    
                    // 机械连接
                    ctx.strokeStyle = "rgba(255,255,255,0.2)";
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-offX, -offY); ctx.stroke();
                    
                    window.drawEnergyCore(ctx, 0, 0, 25, side === 1 ? "#00bcd4" : "#00ffff");
                    ctx.rotate(time * 2 * side); 
                    ctx.strokeStyle = side === 1 ? "#00bcd4" : "#00ffff"; ctx.lineWidth = 3; 
                    ctx.strokeRect(-35, -35, 70, 70);
                    ctx.restore();
                });
                ctx.restore();
            }
        },
        "Cancer": {
            color: "#4caf50", glow: "#8bc34a", symbol: "♋",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 蟹爪骨架
                for(let i=0; i<3; i++) {
                    [-1, 1].forEach(side => {
                        const angle = (i - 1) * 0.5 + Math.sin(time + i) * 0.2;
                        const x2 = side * (70 + i * 20);
                        const y2 = (i - 1) * 40;
                        window.drawSkeleton(ctx, side * 30, 0, x2, y2, "#8bc34a");
                    });
                }

                // 2. 主壳装甲
                ctx.beginPath(); ctx.ellipse(0, 0, 75, 55, 0, 0, Math.PI*2);
                const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 75);
                grad.addColorStop(0, "#2e7d32"); grad.addColorStop(1, "#1a1a1e");
                ctx.fillStyle = grad; ctx.strokeStyle = "#8bc34a"; ctx.lineWidth = 4;
                ctx.fill(); ctx.stroke();

                // 3. 内核
                window.drawEnergyCore(ctx, 0, 0, 28, "#4caf50");
                ctx.shadowBlur = 30; ctx.font = "bold 50px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♋", 0, 15);
                ctx.restore();
            }
        },
        "Leo": {
            color: "#ffc107", glow: "#ffd700", symbol: "♌",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 鬃毛骨架 (Radial)
                for(let i=0; i<12; i++) {
                    const angle = i * Math.PI/6 + time;
                    const x2 = Math.cos(angle) * 100;
                    const y2 = Math.sin(angle) * 100;
                    window.drawSkeleton(ctx, 0, 0, x2, y2, "#ffd700");
                    
                    // 尖刺装甲
                    ctx.save(); ctx.rotate(angle);
                    ctx.fillStyle = "#2a2a2e"; ctx.strokeStyle = "#ffc107";
                    ctx.beginPath(); ctx.moveTo(50, -15); ctx.lineTo(95, 0); ctx.lineTo(50, 15); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.restore();
                }

                // 2. 内核
                window.drawEnergyCore(ctx, 0, 0, 40, "#ffd700");
                ctx.shadowBlur = 40; ctx.font = "bold 55px Arial"; ctx.textAlign="center"; ctx.fillStyle = "#fff"; ctx.fillText("♌", 0, 15);
                ctx.restore();
            }
        },
        "Virgo": {
            color: "#9c27b0", glow: "#e1bee7", symbol: "♍",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 机械翼骨架
                for(let i=0; i<4; i++) {
                    [-1, 1].forEach(side => {
                        const wingAngle = Math.sin(time + i * 0.5) * 0.2 + i * 0.4;
                        const x2 = side * 120;
                        const y2 = -40 - i * 30;
                        window.drawSkeleton(ctx, side * 10, 0, x2, y2, "#e1bee7");
                        
                        // 羽翼装甲
                        ctx.save(); ctx.translate(x2/2, y2/2); ctx.rotate(side * wingAngle);
                        window.drawArmor(ctx, [{x:-20,y:-5},{x:20,y:-5},{x:30,y:5},{x:-30,y:5}], "#9c27b0");
                        ctx.restore();
                    });
                }

                // 2. 内核
                window.drawEnergyCore(ctx, 0, 0, 30, "#e1bee7");
                ctx.shadowBlur = 35; ctx.font = "bold 45px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♍", 0, 15);
                ctx.restore();
            }
        },
        "Libra": {
            color: "#4caf50", glow: "#8bc34a", symbol: "♎",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 横梁骨架
                window.drawSkeleton(ctx, -100, 0, 100, 0, "#8bc34a");
                window.drawSkeleton(ctx, 0, -40, 0, 60, "#8bc34a");

                // 2. 托盘
                [-1, 1].forEach(side => {
                    const plateOffY = Math.sin(time + side * Math.PI) * 20;
                    window.drawSkeleton(ctx, side * 100, 0, side * 100, 40 + plateOffY, "#8bc34a");
                    
                    ctx.save(); ctx.translate(side * 100, 40 + plateOffY);
                    window.drawArmor(ctx, [{x:-40,y:0},{x:40,y:0},{x:30,y:20},{x:-30,y:20}], "#4caf50");
                    window.drawEnergyCore(ctx, 0, -10, 15, "#8bc34a");
                    ctx.restore();
                });

                // 3. 中心内核
                window.drawEnergyCore(ctx, 0, 0, 25, "#4caf50");
                ctx.restore();
            }
        },
        "Scorpio": {
            color: "#9c27b0", glow: "#ff0000", symbol: "♏",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 蝎尾骨架 (Segmented)
                let lastX = 0, lastY = 30;
                for(let i=1; i<=8; i++) {
                    const segmentAngle = Math.sin(time * 2 + i * 0.4) * 0.3;
                    const nextX = lastX + Math.cos(segmentAngle + Math.PI/3) * 25; 
                    const nextY = lastY - Math.sin(segmentAngle + Math.PI/3) * 25;
                    window.drawSkeleton(ctx, lastX, lastY, nextX, nextY, "#ff0000");
                    lastX = nextX; lastY = nextY;
                }
                
                // 2. 毒刺内核
                window.drawEnergyCore(ctx, lastX, lastY, 20, "#ff0000");

                // 3. 身体装甲
                window.drawArmor(ctx, [{x:-50,y:0},{x:50,y:0},{x:40,y:40},{x:-40,y:40}], "#9c27b0");
                window.drawEnergyCore(ctx, 0, 15, 30, "#9c27b0");
                ctx.restore();
            }
        },
        "Sagittarius": {
            color: "#2196f3", glow: "#03a9f4", symbol: "♐",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 弓身骨架
                ctx.save(); ctx.strokeStyle = "#2196f3"; ctx.lineWidth = 8;
                ctx.beginPath(); ctx.arc(0, 0, 80, -Math.PI * 0.9, -Math.PI * 0.1); ctx.stroke(); ctx.restore();

                // 2. 机械弦与箭
                const pullBack = Math.sin(time * 4) * 25;
                window.drawSkeleton(ctx, -75, -25, 0, 40 + pullBack, "#03a9f4");
                window.drawSkeleton(ctx, 75, -25, 0, 40 + pullBack, "#03a9f4");
                window.drawSkeleton(ctx, 0, 40 + pullBack, 0, -100, "#fff");

                // 3. 箭头内核
                window.drawEnergyCore(ctx, 0, -105, 20, "#ffd700");
                window.drawEnergyCore(ctx, 0, 0, 35, "#2196f3");
                ctx.restore();
            }
        },
        "Capricorn": {
            color: "#795548", glow: "#4caf50", symbol: "♑",
            draw: (ctx, boss) => {
                ctx.save();
                
                // 1. 机械躯干
                window.drawSkeleton(ctx, 0, -60, 60, 40, "#4caf50");
                window.drawSkeleton(ctx, 0, -60, -60, 40, "#4caf50");

                // 2. 复合装甲
                const armorPoints = [
                    {x: 0, y: -70}, {x: 60, y: 40}, {x: 40, y: 70}, 
                    {x: -40, y: 70}, {x: -60, y: 40}
                ];
                window.drawArmor(ctx, armorPoints, "#795548");

                // 3. 内核
                window.drawEnergyCore(ctx, 0, 10, 35, "#4caf50");
                ctx.shadowBlur = 30; ctx.font = "bold 50px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("♑", 0, 15);
                ctx.restore();
            }
        },
        "Aquarius": {
            color: "#00bcd4", glow: "#e0f7fa", symbol: "♒",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.003;
                
                // 1. 浮游炮/水瓶座骨架
                for(let i=0; i<3; i++) {
                    ctx.save(); ctx.rotate(time + i * Math.PI*2/3);
                    window.drawSkeleton(ctx, 0, 0, 90, 0, "#00bcd4");
                    window.drawEnergyCore(ctx, 90, 0, 15, "#e0f7fa");
                    ctx.restore();
                }

                // 2. 主瓶体装甲
                ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI*2);
                ctx.fillStyle = "rgba(0, 188, 212, 0.2)"; ctx.strokeStyle = "#e0f7fa"; ctx.lineWidth = 3;
                ctx.fill(); ctx.stroke();

                // 3. 能量流
                for(let i=0; i<5; i++) {
                    ctx.save(); ctx.rotate(time * (i+1) * 0.4);
                    ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
                    ctx.beginPath(); ctx.ellipse(0, 0, 50 + i*10, 25 + i*5, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                }

                window.drawEnergyCore(ctx, 0, 0, 35, "#00bcd4");
                ctx.restore();
            }
        },
        "Pisces": {
            color: "#3f51b5", glow: "#9c27b0", symbol: "♓",
            draw: (ctx, boss) => {
                ctx.save(); const time = Date.now() * 0.002;
                
                // 1. 机械双鱼环
                [-1, 1].forEach(side => {
                    const angle = time * 2 + (side === 1 ? 0 : Math.PI);
                    const radius = 80 + Math.sin(time*4)*15;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    window.drawSkeleton(ctx, 0, 0, x, y, side === 1 ? "#3f51b5" : "#9c27b0");
                    
                    ctx.save(); ctx.translate(x, y); ctx.rotate(angle + Math.PI/2);
                    window.drawArmor(ctx, [{x:-20,y:-35},{x:20,y:-35},{x:25,y:0},{x:-25,y:0}], side === 1 ? "#3f51b5" : "#9c27b0");
                    window.drawEnergyCore(ctx, 0, 0, 18, "#fff");
                    ctx.restore();
                });

                window.drawEnergyCore(ctx, 0, 0, 30, "rgba(255, 255, 255, 0.5)");
                ctx.restore();
            }
        }
    };

    // 别名支持
    Object.keys(window.CONSTELLATION_DESIGNS).forEach(key => {
        const chineseName = {
            "Aries": "白羊宫", "Taurus": "金牛宫", "Gemini": "双子宫", "Cancer": "巨蟹宫",
            "Leo": "狮子宫", "Virgo": "处女宫", "Libra": "天秤宫", "Scorpio": "天蝎宫",
            "Sagittarius": "射手宫", "Capricorn": "摩羯宫", "Aquarius": "水瓶宫", "Pisces": "双鱼宫"
        }[key];
        if (chineseName) window.CONSTELLATION_DESIGNS[chineseName] = window.CONSTELLATION_DESIGNS[key];
    });
})();