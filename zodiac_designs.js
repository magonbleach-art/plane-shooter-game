/**
 * 🛡️ OpenClaw 生肖进化全书 (Zodiac Evolution Codex)
 * 定义 12 生肖的攻击特效、觉醒技能及其视觉表现
 */

// ========== 3A级绘制工具函数 ==========

/**
 * 绘制能量核心（多层光晕）
 */
window.drawEnergyCore = function(ctx, x, y, radius, color) {
    ctx.save();
    for(let i=3; i>0; i--) {
        ctx.shadowBlur = 20 * i;
        ctx.shadowColor = color;
        const grad = ctx.createRadialGradient(x, y, radius * 0.3 * i, x, y, radius * i);
        grad.addColorStop(0, color);
        grad.addColorStop(0.7, color + "aa");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, radius * i, 0, Math.PI*2); ctx.fill();
    }
    // 核心亮点
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(x, y, radius * 0.2, 0, Math.PI*2); ctx.fill();
    ctx.restore();
};

/**
 * 🔫 生肖武器设计 (Zodiac Weapon Designs)
 * 定义玩家可装备的 12 生肖子弹特效与大招
 */
// 🛡️ [进化 v7.4] 核心设计编码规范：强制 window 挂载，防止被重复定义
(function() {
    if (typeof window.ZODIAC_DESIGNS === 'undefined') {
        window.ZODIAC_DESIGNS = {
            rat: {
                name: "子鼠 · 灵动", color: "#ffd700",
                attack_effect: (ctx, bullet) => {
                    ctx.fillStyle = "#ffd700"; ctx.shadowBlur = 15; ctx.shadowColor = "#ffd700";
                    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
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
    }

    if (typeof window.CONSTELLATION_DESIGNS === 'undefined') {
        window.CONSTELLATION_DESIGNS = {
            Aries: {
                color: "#f44336",
                draw: (ctx, boss) => {
                    ctx.fillStyle = "#f44336"; ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#fff"; ctx.lineWidth = 4; ctx.stroke();
                    ctx.font = "30px Arial"; ctx.textAlign="center"; ctx.fillStyle="#fff"; ctx.fillText("♈", 0, 10);
                }
            },
            Taurus: {
                color: "#8d6e63",
                draw: (ctx, boss) => {
                    ctx.fillStyle = "#8d6e63"; ctx.fillRect(-30, -30, 60, 60);
                    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 4; ctx.strokeRect(-35, -35, 70, 70);
                    ctx.font = "30px Arial"; ctx.textAlign="center"; ctx.fillStyle="#fff"; ctx.fillText("♉", 0, 10);
                }
            },
            Gemini: {
                color: "#00bcd4",
                draw: (ctx, boss) => {
                    [[-20, 0], [20, 0]].forEach(p => {
                        ctx.fillStyle = "#00bcd4"; ctx.beginPath(); ctx.arc(p[0], p[1], 20, 0, Math.PI*2); ctx.fill();
                    });
                    ctx.font = "30px Arial"; ctx.textAlign="center"; ctx.fillStyle="#fff"; ctx.fillText("♊", 0, 10);
                }
            }
        };
        // 别名
        window.CONSTELLATION_DESIGNS["白羊宫"] = window.CONSTELLATION_DESIGNS["Aries"];
    }
})();

/**
 * 🌌 十二星座 Boss 视觉规范 (Constellation Boss Aesthetics)
 * 定义 Boss 的程序化绘图逻辑、星芒特效与核心光晕
 */
if (typeof window.CONSTELLATION_DESIGNS === 'undefined') {
    window.CONSTELLATION_DESIGNS = {
        "Aries": {
            color: "#f44336",
            glow: "#ff5252",
            symbol: "♈",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 外部机械装甲 (Outer Armor) ===
                ctx.shadowBlur = 15; ctx.shadowColor = "#f44336";
                const armorGrad = ctx.createLinearGradient(-50, -30, 50, 30);
                armorGrad.addColorStop(0, "#2a2a2e");
                armorGrad.addColorStop(0.5, "#4a4a50");
                armorGrad.addColorStop(1, "#2a2a2e");
                ctx.fillStyle = armorGrad;
                ctx.strokeStyle = "#ff5252"; ctx.lineWidth = 3;
                
                ctx.beginPath();
                ctx.moveTo(-50, -25); ctx.lineTo(50, -25);
                ctx.lineTo(60, 10); ctx.lineTo(0, 40); ctx.lineTo(-60, 10);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                // === 2. 机械羊角 (Mechanical Horns) ===
                [-1, 1].forEach(side => {
                    ctx.save();
                    ctx.translate(side * 40, -20);
                    ctx.rotate(side * (0.2 + Math.sin(time) * 0.1));
                    
                    // 羊角多段结构
                    ctx.strokeStyle = "#f44336"; ctx.lineWidth = 12;
                    ctx.beginPath();
                    ctx.arc(side * 15, -15, 30, Math.PI, Math.PI * 1.8, side === -1);
                    ctx.stroke();
                    
                    // 羊角尖端能量
                    ctx.fillStyle = "#fff"; ctx.shadowBlur = 20;
                    ctx.beginPath(); ctx.arc(side * 35, -35, 6, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                });

                // === 3. 核心能量源 (Inner Core) ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 5, 25, "#ff5252");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 30; ctx.shadowColor = "#ff5252";
                ctx.font = "bold 50px Arial"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♈", 0, 15);
                
                ctx.restore();
            }
        },
        "Taurus": {
            color: "#8d6e63",
            glow: "#ffd700",
            symbol: "♉",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 重型铸造装甲 (Outer Armor) ===
                const armorGrad = ctx.createLinearGradient(-55, -35, 55, 35);
                armorGrad.addColorStop(0, "#1a1a1e");
                armorGrad.addColorStop(0.5, "#3a3a40");
                armorGrad.addColorStop(1, "#1a1a1e");
                ctx.fillStyle = armorGrad;
                ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 4;
                
                ctx.beginPath();
                ctx.moveTo(-55, -35); ctx.lineTo(55, -35);
                ctx.lineTo(65, 5); ctx.lineTo(55, 45);
                ctx.lineTo(-55, 45); ctx.lineTo(-65, 5);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
                
                // 装甲缝隙光效
                ctx.shadowBlur = 10; ctx.shadowColor = "#ffd700";
                ctx.strokeStyle = "rgba(255, 215, 0, 0.4)"; ctx.lineWidth = 1;
                ctx.strokeRect(-50, -30, 100, 70);

                // === 2. 机械牛角 (Hydraulic Horns) ===
                [-1, 1].forEach(side => {
                    ctx.save();
                    ctx.translate(side * 45, -30);
                    const tilt = Math.sin(time) * 0.1;
                    ctx.rotate(side * tilt);
                    
                    // 主角结构
                    ctx.shadowBlur = 20; ctx.shadowColor = "#ffd700";
                    ctx.strokeStyle = "#8d6e63"; ctx.lineWidth = 14;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(side * 30, -40);
                    ctx.lineTo(side * 15, -60);
                    ctx.stroke();
                    
                    // 液压推杆
                    ctx.strokeStyle = "#aaa"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.moveTo(side * 5, 5); ctx.lineTo(side * 20, -35); ctx.stroke();
                    
                    // 角尖能量聚集
                    ctx.fillStyle = "#fff"; ctx.shadowBlur = 15;
                    ctx.beginPath(); ctx.arc(side * 15, -60, 6, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                });

                // === 3. 核心与活塞 (Inner Core & Pistons) ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 5, 30, "#ffd700");
                
                // 垂直活塞运动
                const pistonOff = Math.sin(time * 4) * 10;
                ctx.fillStyle = "#555";
                [-1, 1].forEach(side => {
                    ctx.fillRect(side * 30 - 5, 10 + pistonOff, 10, 25);
                    ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;
                    ctx.strokeRect(side * 30 - 5, 10 + pistonOff, 10, 25);
                });
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 40; ctx.shadowColor = "#ffd700";
                ctx.font = "bold 55px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♉", 0, 15);
                
                ctx.restore();
            }
        },
        "Gemini": {
            color: "#00bcd4",
            glow: "#00ffff",
            symbol: "♊",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.003;
                
                // === 1. 双子联动核心 (Twin Orbiting Cores) ===
                [-1, 1].forEach(side => {
                    const offY = Math.sin(time + side * Math.PI) * 25;
                    const offX = side * (45 + Math.cos(time) * 10);
                    
                    ctx.save();
                    ctx.translate(offX, offY);
                    
                    // 核心渲染
                    if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 22, side === 1 ? "#00bcd4" : "#00ffff");
                    
                    // 几何护盾片 (Rotating Shields)
                    ctx.rotate(time * 2 * side);
                    ctx.strokeStyle = side === 1 ? "#00bcd4" : "#00ffff";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-28, -28, 56, 56);
                    
                    // 浮动装甲块
                    ctx.fillStyle = "#1a1a1e";
                    ctx.fillRect(25, -5, 10, 10);
                    ctx.fillRect(-35, -5, 10, 10);
                    
                    ctx.restore();
                    
                    // 符号显示
                    ctx.save();
                    ctx.translate(offX, offY);
                    ctx.font = "bold 30px Arial"; ctx.textAlign = "center";
                    ctx.fillStyle = "#fff";
                    ctx.fillText("♊", 0, 10);
                    ctx.restore();
                });

                // === 2. 能量共鸣束 (Resonance Beams) ===
                ctx.setLineDash([8, 12]);
                ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
                ctx.lineWidth = 3;
                ctx.shadowBlur = 15; ctx.shadowColor = "#00ffff";
                ctx.beginPath();
                ctx.moveTo(-45 - Math.cos(time)*10, Math.sin(time - Math.PI)*25);
                ctx.lineTo(45 + Math.cos(time)*10, Math.sin(time)*25);
                ctx.stroke();
                
                // === 3. 中央虚空稳定器 (Void Stabilizer) ===
                ctx.setLineDash([]);
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, 30 + Math.sin(time*5)*5, 0, Math.PI*2);
                ctx.stroke();
                
                ctx.restore();
            }
        },
        "Cancer": {
            color: "#4caf50",
            glow: "#8bc34a",
            symbol: "♋",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 多层复合甲壳 (Composite Shell) ===
                ctx.shadowBlur = 20; ctx.shadowColor = "#4caf50";
                const shellGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 60);
                shellGrad.addColorStop(0, "#2e7d32");
                shellGrad.addColorStop(1, "#1a1a1e");
                ctx.fillStyle = shellGrad;
                ctx.strokeStyle = "#8bc34a"; ctx.lineWidth = 3;
                
                // 主甲壳
                ctx.beginPath(); ctx.ellipse(0, 0, 65, 45, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

                // === 2. 液压巨螯 (Hydraulic Pincers) ===
                [-1, 1].forEach(side => {
                    ctx.save();
                    const pincerAngle = Math.sin(time * 3) * 0.3;
                    ctx.translate(side * 60, -10);
                    ctx.rotate(side * (0.5 + pincerAngle));
                    
                    ctx.strokeStyle = "#4caf50"; ctx.lineWidth = 14;
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(side*20, -40, side*50, -10); ctx.stroke();
                    
                    ctx.fillStyle = "#8bc34a"; ctx.shadowBlur = 15;
                    ctx.beginPath(); ctx.arc(side*50, -10, 8, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                });

                // === 3. 核心感知阵列 (Sensor Array) ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 22, "#4caf50");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 30; ctx.shadowColor = "#8bc34a";
                ctx.font = "bold 50px Arial"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♋", 0, 15);
                
                ctx.restore();
            }
        },
        "Leo": {
            color: "#ffc107",
            glow: "#ffd700",
            symbol: "♌",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 鬃毛装甲片 (Rotating Mane Armor) ===
                ctx.shadowBlur = 15; ctx.shadowColor = "#ffc107";
                for(let i=0; i<12; i++) {
                    ctx.save();
                    ctx.rotate(i * Math.PI/6 + time);
                    ctx.fillStyle = "#2a2a2e"; ctx.strokeStyle = "#ffc107"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(45, -12); ctx.lineTo(85, 0); ctx.lineTo(45, 12); ctx.closePath();
                    ctx.fill(); ctx.stroke();
                    ctx.restore();
                }

                // === 2. 机械狮首 (Mechanical Head) ===
                ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(-35, -25); ctx.lineTo(35, -25);
                ctx.lineTo(45, 10); ctx.lineTo(0, 45); ctx.lineTo(-45, 10);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                // === 3. 太阳核心 (Solar Core) ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 32, "#ffd700");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 40; ctx.shadowColor = "#ffd700";
                ctx.font = "bold 50px Arial"; ctx.textAlign="center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♌", 0, 15);
                
                ctx.restore();
            }
        },
        "Virgo": {
            color: "#9c27b0",
            glow: "#e1bee7",
            symbol: "♍",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 六翼天使机甲 (Mechanical Seraph Wings) ===
                for(let i=0; i<3; i++) {
                    [-1, 1].forEach(side => {
                        ctx.save();
                        const wingAngle = Math.sin(time + i * 0.5) * 0.15 + i * 0.4;
                        ctx.rotate(side * wingAngle);
                        
                        ctx.strokeStyle = "#9c27b0"; ctx.lineWidth = 4;
                        ctx.beginPath();
                        ctx.moveTo(side * 10, 0);
                        ctx.quadraticCurveTo(side * 40, -20 - i * 20, side * 90, -10 - i * 10);
                        ctx.stroke();
                        
                        const wingGrad = ctx.createLinearGradient(0, 0, side * 90, 0);
                        wingGrad.addColorStop(0, "rgba(156, 39, 176, 0.4)");
                        wingGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
                        ctx.fillStyle = wingGrad;
                        ctx.beginPath();
                        ctx.moveTo(side * 10, 0);
                        ctx.quadraticCurveTo(side * 40, -20 - i * 20, side * 90, -10 - i * 10);
                        ctx.lineTo(side * 80, 10 - i * 5);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    });
                }

                // === 2. 核心神像装甲 (Idol Armor) ===
                ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#e1bee7"; ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-15, -35); ctx.lineTo(15, -35);
                ctx.lineTo(25, 10); ctx.lineTo(0, 45); ctx.lineTo(-25, 10);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                // === 3. 核心 (Inner Core) ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 22, "#e1bee7");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 35; ctx.shadowColor = "#e1bee7";
                ctx.font = "bold 45px Arial"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♍", 0, 15);
                
                ctx.restore();
            }
        },
        "Libra": {
            color: "#4caf50",
            glow: "#8bc34a",
            symbol: "♎",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 激光平衡梁 (Laser Balance Beam) ===
                ctx.shadowBlur = 20; ctx.shadowColor = "#4caf50";
                ctx.strokeStyle = "#4caf50"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.moveTo(-75, 0); ctx.lineTo(75, 0); ctx.stroke();
                
                // === 2. 重力感应托盘 (Gravity Plates) ===
                [-1, 1].forEach(side => {
                    const plateOffY = Math.sin(time + side * Math.PI) * 15;
                    ctx.save();
                    ctx.translate(side * 75, plateOffY);
                    ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#8bc34a"; ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(-30, 0); ctx.lineTo(30, 0);
                    ctx.lineTo(20, 15); ctx.lineTo(-20, 15);
                    ctx.closePath();
                    ctx.fill(); ctx.stroke();
                    if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, -5, 12, "#8bc34a");
                    ctx.restore();
                });

                // === 3. 中央稳定核心 ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, -20, 20, "#4caf50");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 35; ctx.shadowColor = "#8bc34a";
                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♎", 0, 15);
                
                ctx.restore();
            }
        },
        "Scorpio": {
            color: "#9c27b0",
            glow: "#ff0000",
            symbol: "♏",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 分段式机械蝎尾 (Segmented Tail) ===
                ctx.strokeStyle = "#9c27b0"; ctx.lineWidth = 8;
                let lastX = 0, lastY = 25;
                for(let i=1; i<=6; i++) {
                    const segmentAngle = Math.sin(time * 2 + i * 0.5) * 0.2;
                    const nextX = lastX + Math.cos(segmentAngle + Math.PI/4) * 20;
                    const nextY = lastY - Math.sin(segmentAngle + Math.PI/4) * 20;
                    ctx.shadowBlur = 15; ctx.shadowColor = "#9c27b0";
                    ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(nextX, nextY); ctx.stroke();
                    lastX = nextX; lastY = nextY;
                }

                // === 2. 毒针能量核心 (Stinger Core) ===
                ctx.save();
                ctx.translate(lastX, lastY);
                ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#ff0000"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(25, -25); ctx.lineTo(5, -30); ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.restore();

                // === 3. 躯干核心与螯肢 ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 10, 25, "#9c27b0");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 40; ctx.shadowColor = "#ff0000";
                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♏", 0, 20);
                
                ctx.restore();
            }
        },
        "Sagittarius": {
            color: "#2196f3",
            glow: "#03a9f4",
            symbol: "♐",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                
                // === 1. 机械复合弓 (Mechanical Compound Bow) ===
                ctx.shadowBlur = 20; ctx.shadowColor = "#2196f3";
                ctx.strokeStyle = "#2196f3"; ctx.lineWidth = 5;
                ctx.beginPath(); ctx.arc(0, 0, 65, -Math.PI * 0.85, -Math.PI * 0.15); ctx.stroke();
                
                // === 2. 激光箭簇 (Laser Arrow) ===
                ctx.save();
                const pullBack = Math.sin(time * 3) * 15;
                ctx.translate(0, pullBack);
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, -70); ctx.stroke();
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, -75, 12, "#ffd700");
                ctx.restore();

                // === 3. 稳定翼与核心 ===
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 22, "#03a9f4");
                
                // === 4. 星魂符号 ===
                ctx.shadowBlur = 35; ctx.shadowColor = "#03a9f4";
                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♐", 0, 20);
                
                ctx.restore();
            }
        },
        "Capricorn": {
            color: "#795548",
            glow: "#4caf50",
            symbol: "♑",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#795548"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.moveTo(0, -55); ctx.lineTo(50, 35); ctx.lineTo(30, 50); ctx.lineTo(-30, 50); ctx.lineTo(-50, 35); ctx.closePath();
                ctx.fill(); ctx.stroke();

                [-1, 1].forEach(side => {
                    ctx.save();
                    ctx.translate(side * 30, -35);
                    ctx.strokeStyle = "#795548"; ctx.lineWidth = 10;
                    ctx.beginPath();
                    for(let j=0; j<40; j++) {
                        const r = 5 + j*0.2;
                        const x = Math.cos(j*0.5) * r * side;
                        const y = -j * 1.5;
                        if(j===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.restore();
                });

                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 10, 28, "#4caf50");
                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♑", 0, 15);
                ctx.restore();
            }
        },
        "Aquarius": {
            color: "#00bcd4",
            glow: "#e0f7fa",
            symbol: "♒",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.003;
                ctx.shadowBlur = 25; ctx.shadowColor = "#00bcd4";
                ctx.fillStyle = "rgba(0, 188, 212, 0.2)"; ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(0, 0, 55, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 30, "#00bcd4");
                
                for(let i=0; i<3; i++) {
                    ctx.save();
                    ctx.rotate(time * (i+1) * 0.5);
                    ctx.strokeStyle = "rgba(0, 255, 255, 0.4)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(0, 0, 45 + i*10, 20 + i*5, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                }

                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♒", 0, 15);
                ctx.restore();
            }
        },
        "Pisces": {
            color: "#3f51b5",
            glow: "#9c27b0",
            symbol: "♓",
            draw: (ctx, boss) => {
                ctx.save();
                const time = Date.now() * 0.002;
                [-1, 1].forEach(side => {
                    const angle = time * 2 + (side === 1 ? 0 : Math.PI);
                    const radius = 65 + Math.sin(time*3)*10;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    ctx.save();
                    ctx.translate(x, y); ctx.rotate(angle + Math.PI/2);
                    ctx.fillStyle = side === 1 ? "#3f51b5" : "#9c27b0"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(0, 0, 15, 30, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                    ctx.restore();
                });

                if (typeof drawEnergyCore === 'function') drawEnergyCore(ctx, 0, 0, 25, "rgba(255, 255, 255, 0.5)");
                ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
                ctx.fillStyle = "#fff";
                ctx.fillText("♓", 0, 15);
                ctx.restore();
            }
        }
    };

    // 为兼容性添加中文键名
    window.CONSTELLATION_DESIGNS["白羊宫"] = window.CONSTELLATION_DESIGNS["Aries"];
    window.CONSTELLATION_DESIGNS["金牛宫"] = window.CONSTELLATION_DESIGNS["Taurus"];
    window.CONSTELLATION_DESIGNS["双子宫"] = window.CONSTELLATION_DESIGNS["Gemini"];
    window.CONSTELLATION_DESIGNS["巨蟹宫"] = window.CONSTELLATION_DESIGNS["Cancer"];
    window.CONSTELLATION_DESIGNS["狮子宫"] = window.CONSTELLATION_DESIGNS["Leo"];
    window.CONSTELLATION_DESIGNS["处女宫"] = window.CONSTELLATION_DESIGNS["Virgo"];
    window.CONSTELLATION_DESIGNS["天秤宫"] = window.CONSTELLATION_DESIGNS["Libra"];
    window.CONSTELLATION_DESIGNS["天蝎宫"] = window.CONSTELLATION_DESIGNS["Scorpio"];
    window.CONSTELLATION_DESIGNS["射手宫"] = window.CONSTELLATION_DESIGNS["Sagittarius"];
    window.CONSTELLATION_DESIGNS["摩羯宫"] = window.CONSTELLATION_DESIGNS["Capricorn"];
    window.CONSTELLATION_DESIGNS["水瓶宫"] = window.CONSTELLATION_DESIGNS["Aquarius"];
    window.CONSTELLATION_DESIGNS["双鱼宫"] = window.CONSTELLATION_DESIGNS["Pisces"];
}
