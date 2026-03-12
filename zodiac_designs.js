/**
 * 🛡️ OpenClaw 生肖进化全书 (Zodiac Evolution Codex)
 * 定义 12 生肖的攻击特效、觉醒技能及其视觉表现
 */

const ZODIAC_DESIGNS = {
    rat: {
        name: "鼠·天罗网弹",
        color: "#e0e0e0",
        description: "智能追踪，拦截敌弹",
        damage: 3.5,
        homing: true,
        homing_speed: 0.2,
        attack_effect: (ctx, bullet) => {
            // 蜘蛛网状子弹
            ctx.strokeStyle = "#e0e0e0"; ctx.lineWidth = 1;
            for(let i=0; i<6; i++) {
                ctx.moveTo(0,0);
                ctx.lineTo(Math.cos(i*Math.PI/3)*15, Math.sin(i*Math.PI/3)*15);
            }
            ctx.stroke();
        },
        ultimate: {
            name: "万鼠噬心",
            desc: "召唤全屏干扰磁场，自动销毁所有敌弹并持续啃噬敌机",
            trigger: (gameState) => {
                gameState.bullets = gameState.bullets.filter(b => !b.isEnemy);
                gameState.enemies.forEach(e => e.hp -= 2);
            }
        }
    },
    ox: {
        name: "牛·破甲重弹",
        color: "#8d6e63",
        description: "穿透一切，硬直击退",
        damage: 5,
        pierce: true,
        knockback: 30,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#8d6e63";
            ctx.fillRect(-15, -20, 30, 40); // 矩形重型子弹
            ctx.fillStyle = "#ff0"; ctx.fillRect(-5, -25, 10, 10); // 弹头火光
        },
        ultimate: {
            name: "蛮牛冲撞",
            desc: "机体化身黄金巨牛，冲撞瞬间造成 50 倍伤害并处于无敌状态",
            trigger: (gameState) => {
                gameState.isInvincible = true;
                gameState.player.speed *= 2;
            }
        }
    },
    tiger: {
        name: "虎·狂啸散弹",
        color: "#ff9800",
        description: "扇形爆发，近战无敌",
        damage: 1.5,
        scatter: 7,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#ff9800";
            ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(-10, 10); ctx.lineTo(10, 10); ctx.fill();
        },
        ultimate: {
            name: "虎啸山河",
            desc: "释放震荡波，令全屏敌机进入 3 秒“恐惧”状态（停止移动）",
            trigger: (gameState) => {
                gameState.enemies.forEach(e => { e.speed = 0; setTimeout(() => e.speed = 2, 3000); });
            }
        }
    },
    rabbit: {
        name: "兔·跃动跳弹",
        color: "#f06292",
        description: "无限反弹，穿梭自如",
        damage: 1.2,
        bounces: 5,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#f06292";
            ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = "#fff"; ctx.stroke();
        },
        ultimate: {
            name: "灵兔幻影",
            desc: "制造 3 个持续 10 秒的幻影分身，同步玩家所有操作",
            trigger: (gameState) => {
                gameState.isInvincible(true);
                // 幻影逻辑通过 gameState 暴露接口
                console.log("灵兔幻影激活");
            }
        }
    },
    dragon: {
        name: "龙·贯日激光",
        color: "#ffd700",
        description: "光速打击，全屏贯穿",
        damage: 1.0,
        is_laser: true,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "rgba(255, 215, 0, 0.6)";
            ctx.fillRect(-10, -1000, 20, 1000); // 激光束
        },
        ultimate: {
            name: "九龙吐息",
            desc: "全屏扇形扫射圣光激光，持续毁灭所有可见敌人",
            trigger: (gameState) => {
                gameState.screenShake = 20;
            }
        }
    },
    snake: {
        name: "蛇·曲行毒弹",
        color: "#4caf50",
        description: "S型弹道，百分比毒伤",
        damage: 1.0,
        poison: true,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#4caf50";
            ctx.beginPath(); ctx.ellipse(0, 0, 5, 12, 0, 0, Math.PI*2); ctx.fill();
        },
        ultimate: {
            name: "万毒归宗",
            desc: "全屏毒雾，每秒扣除敌机 10% 的最大生命值",
            trigger: (gameState) => {
                gameState.enemies.forEach(e => e.hp *= 0.9);
            }
        }
    },
    horse: {
        name: "马·疾驰穿甲弹",
        color: "#2196f3",
        description: "极速射击，攻击力随速度提升",
        damage: 2.5,
        speed_mult: 3.0,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#2196f3";
            ctx.beginPath(); ctx.moveTo(0, -25); ctx.lineTo(-5, 10); ctx.lineTo(5, 10); ctx.fill();
        },
        ultimate: {
            name: "八骏神行",
            desc: "进入“子弹时间”，全屏减速 80%，玩家攻击频率翻倍",
            trigger: (gameState) => {
                gameState.enemies.forEach(e => e.speed *= 0.2);
            }
        }
    },
    goat: {
        name: "羊·圣光护弹",
        color: "#ffffff",
        description: "治疗灵力，神圣守护",
        damage: 0.5,
        heal_chance: 0.1,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 10; ctx.shadowColor = "#fff";
            ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI*2); ctx.fill();
        },
        ultimate: {
            name: "神羊祈福",
            desc: "瞬间恢复所有生命值，并获得 10 秒绝对无敌护盾",
            trigger: (gameState) => {
                gameState.lives = 5;
                gameState.isInvincible = true;
            }
        }
    },
    monkey: {
        name: "猴·顽劣反弹弹",
        color: "#ffeb3b",
        description: "分裂攻击，乱战大师",
        damage: 1.2,
        split: true,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#ffeb3b";
            ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-10, 10); ctx.lineTo(10, 10); ctx.fill();
        },
        ultimate: {
            name: "分身乱舞",
            desc: "召唤 72 变，全屏充满随机弹射的子弹，持续 5 秒",
            trigger: (gameState) => {
                gameState.screenShake(10);
                console.log("分身乱舞激活");
            }
        }
    },
    rooster: {
        name: "鸡·鸣啼眩弹",
        color: "#f44336",
        description: "金光眩晕，控制核心",
        damage: 1.2,
        stun_dur: 180,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#f44336";
            ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 15; ctx.shadowColor = "#f44336";
        },
        ultimate: {
            name: "金鸡报晓",
            desc: "驱散所有黑暗，全屏敌机永久眩晕并受到的伤害翻倍",
            trigger: (gameState) => {
                gameState.enemies.forEach(e => { e.speed = 0; e.isStunned = true; });
            }
        }
    },
    dog: {
        name: "狗·忠魂追踪弹",
        color: "#ffc107",
        description: "咬住不放，精准锁敌",
        damage: 1.8,
        homing: true,
        homing_speed: 0.4,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#ffc107";
            ctx.beginPath(); ctx.ellipse(0, 0, 8, 8, 0, 0, Math.PI*2); ctx.fill();
        },
        ultimate: {
            name: "群犬逐日",
            desc: "发射 12 枚具有“斩杀”效果的超级追踪弹（秒杀 30% 血量以下的敌人）",
            trigger: (gameState) => {
                gameState.screenFlash(15);
                console.log("群犬逐日激活");
            }
        }
    },
    pig: {
        name: "猪·暴食爆破弹",
        color: "#e91e63",
        description: "范围爆破，贪婪吞噬",
        damage: 3.5,
        aoe: 100,
        attack_effect: (ctx, bullet) => {
            ctx.fillStyle = "#e91e63";
            ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI*2); ctx.fill();
        },
        ultimate: {
            name: "饕餮之怒",
            desc: "引发终极黑洞爆破，将全屏敌机吸向中心并瞬间引爆",
            trigger: (gameState) => {
                gameState.enemies.forEach(e => { e.x = 200; e.y = 300; });
                gameState.screenFlash = 30;
            }
        }
    }
};

/**
 * 🌌 十二星座 Boss 视觉规范 (Constellation Boss Aesthetics)
 * 定义 Boss 的程序化绘图逻辑、星芒特效与核心光晕
 */
const CONSTELLATION_DESIGNS = {
    "白羊宫": {
        color: "#ff4b2b",
        glow: "#ff0000",
        symbol: "♈",
        draw: (ctx, boss) => {
            // 3A 级机械神性骨架 (Aries Mecha)
            ctx.save();
            const time = Date.now() * 0.002;
            const hpPercent = boss.hp / boss.maxHp;
            
            // 1. 绘制机械背甲 (分层结构)
            ctx.fillStyle = "#1a1a1e";
            ctx.strokeStyle = "rgba(255, 75, 43, 0.5)"; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-40, -20); ctx.lineTo(40, -20);
            ctx.lineTo(30, 45); ctx.lineTo(-30, 45);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            // 2. 机械羊角 (分段倒角处理)
            ctx.strokeStyle = "#ff4b2b"; ctx.lineWidth = 6;
            ctx.lineCap = "round";
            [-1, 1].forEach(side => {
                ctx.beginPath();
                ctx.arc(side * 25, -15, 20, side === 1 ? 0 : Math.PI, side === 1 ? Math.PI * 0.7 : Math.PI * 0.3, side === -1);
                ctx.stroke();
                // 细节：角上的金属箍
                ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(side * 25, -15, 20, side === 1 ? 0.2 : Math.PI-0.2, side === 1 ? 0.4 : Math.PI-0.4, side === -1); ctx.stroke();
                ctx.strokeStyle = "#ff4b2b"; ctx.lineWidth = 6;
            });

            // 3. 损伤状态表现 (参考 v6.0 协议)
            if (hpPercent < 0.7) {
                // 阶段2：裸露电线与火花
                ctx.strokeStyle = "#00aaff"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(-30, 20); ctx.lineTo(-45, 35); ctx.lineTo(-35, 45); ctx.stroke();
                if (Math.random() > 0.8) {
                    ctx.fillStyle = "#fff"; ctx.fillRect(-45 + Math.random()*10, 35 + Math.random()*10, 2, 2);
                }
            }
            if (hpPercent < 0.3) {
                // 阶段3：核心能量外泄
                const g = ctx.createRadialGradient(0, 10, 0, 0, 10, 40);
                g.addColorStop(0, "rgba(255, 0, 0, 0.6)");
                g.addColorStop(1, "rgba(255, 0, 0, 0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 10, 40, 0, Math.PI*2); ctx.fill();
            }

            // 4. 核心星魂符号 (发光增强)
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 30; ctx.shadowColor = "#ff4b2b";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♈", 0, 20);

            // 5. 机械神性光环
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; ctx.lineWidth = 1;
            ctx.setLineDash([10, 15]); ctx.rotate(time * 0.5);
            ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }
    },
    "金牛宫": {
        color: "#8d6e63",
        glow: "#ffd700",
        symbol: "♉",
        draw: (ctx, boss) => {
            ctx.save();
            const time = Date.now() * 0.002;
            const hpPercent = boss.hp / boss.maxHp;
            
            // 机械重装背甲
            ctx.fillStyle = "#1a1a1e";
            ctx.strokeStyle = "rgba(255, 215, 0, 0.5)"; ctx.lineWidth = 3;
            ctx.strokeRect(-50, -30, 100, 60);
            ctx.fillRect(-50, -30, 100, 60);
            
            // 细节：铆钉
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            [-40, 40].forEach(x => [-20, 20].forEach(y => {
                ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI*2); ctx.fill();
            }));

            // 金色机械牛角
            ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 8;
            ctx.lineJoin = "round";
            ctx.beginPath(); ctx.moveTo(-50, -30); ctx.lineTo(-65, -60); ctx.lineTo(-40, -65); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(50, -30); ctx.lineTo(65, -60); ctx.lineTo(40, -65); ctx.stroke();

            // 核心符号
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 35; ctx.shadowColor = "#ffd700";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♉", 0, 15);
            
            // 推进器火花 (重型感)
            if (hpPercent < 0.5) {
                ctx.fillStyle = "#ff6600";
                for(let i=0; i<5; i++) {
                    ctx.fillRect(-30 + Math.random()*60, 30, 4, 15);
                }
            }
            ctx.restore();
        }
    },
    "双子宫": {
        color: "#03a9f4",
        glow: "#00ffff",
        symbol: "♊",
        draw: (ctx, boss) => {
            ctx.save();
            const time = Date.now() * 0.005;
            const offset = Math.sin(time) * 25;
            
            // 双生机甲结构
            [-1, 1].forEach(side => {
                ctx.save(); ctx.translate(side * 30 + (side * offset), 0);
                ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#03a9f4"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(-20, 40); ctx.lineTo(20, 40); ctx.closePath();
                ctx.fill(); ctx.stroke();
                
                // 内部骨架灯
                ctx.fillStyle = "#00ffff"; ctx.shadowBlur = 10;
                ctx.fillRect(-2, -10, 4, 20);
                ctx.restore();
            });
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 30; ctx.shadowColor = "#00ffff";
            ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♊", 0, 20);
            ctx.restore();
        }
    },
    "巨蟹宫": {
        color: "#e0e0e0",
        glow: "#ffffff",
        symbol: "♋",
        draw: (ctx, boss) => {
            ctx.save();
            // 机械甲壳
            ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.ellipse(0, 0, 55, 45, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            
            // 细节：装甲缝隙
            ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(-55, 0); ctx.lineTo(55, 0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, -45); ctx.lineTo(0, 45); ctx.stroke();

            // 机械巨螯 (液压杆感)
            [-1, 1].forEach(side => {
                ctx.save(); ctx.scale(side, 1);
                ctx.strokeStyle = "#fff"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(-60, -10, 25, 0.5, 2.5); ctx.stroke();
                // 液压核心
                ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-75, 5, 5, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            });
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 30; ctx.shadowColor = "#fff";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♋", 0, 15);
            ctx.restore();
        }
    },
    "狮子宫": {
        color: "#ffd700",
        glow: "#ff9800",
        symbol: "♌",
        draw: (ctx, boss) => {
            ctx.save();
            const time = Date.now() * 0.002;
            const hpPercent = boss.hp / boss.maxHp;
            
            // 1. 三重高能粒子喷口 (参考 v6.0 协议)
            for(let i=0; i<3; i++) {
                const ox = (i-1) * 35;
                const h = 50 + Math.sin(time + i) * 30;
                const g = ctx.createLinearGradient(ox, -30, ox, -30 - h);
                g.addColorStop(0, hpPercent > 0.3 ? "rgba(255, 200, 0, 0.8)" : "rgba(255, 50, 0, 0.9)");
                g.addColorStop(1, "rgba(255, 50, 0, 0)");
                ctx.fillStyle = g; ctx.fillRect(ox - 12, -30 - h, 24, h);
            }
            
            // 2. 机械狮王装甲
            ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#ff9800"; ctx.lineWidth = 3;
            ctx.beginPath(); 
            ctx.moveTo(0, -40); ctx.lineTo(-45, 15); ctx.lineTo(-20, 50); 
            ctx.lineTo(20, 50); ctx.lineTo(45, 15); ctx.closePath(); 
            ctx.fill(); ctx.stroke();
            
            // 3. 机械鬃毛 (放射状装甲片)
            ctx.strokeStyle = "rgba(255, 152, 0, 0.4)"; ctx.lineWidth = 2;
            for(let i=0; i<8; i++) {
                ctx.rotate(Math.PI/4);
                ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, -65); ctx.stroke();
            }
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 40; ctx.shadowColor = "#ff9800";
            ctx.font = "bold 50px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♌", 0, 20);
            ctx.restore();
        }
    },
    "处女宫": {
        color: "#e91e63",
        glow: "#f06292",
        symbol: "♍",
        draw: (ctx, boss) => {
            ctx.save();
            const time = Date.now() * 0.001;
            // 3A 级机械六翼 (参考用户机甲天使)
            for(let i=0; i<6; i++) {
                ctx.save();
                const side = i % 2 === 0 ? 1 : -1;
                const row = Math.floor(i / 2);
                ctx.rotate(side * (0.5 + row * 0.4 + Math.sin(time + row) * 0.15));
                
                // 翼展装甲
                const grad = ctx.createLinearGradient(0, 0, side * 110, 0);
                grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                grad.addColorStop(0.5, "rgba(233, 30, 99, 0.4)");
                grad.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = grad;
                
                ctx.beginPath(); ctx.moveTo(0, 0);
                ctx.bezierCurveTo(side*50, -30, side*80, 30, side*110, 0); ctx.fill();
                
                // 翼尖羽片细节
                ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(side*40, 0); ctx.lineTo(side*100, -10); ctx.stroke();
                ctx.restore();
            }
            
            // 核心机械神环
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; ctx.lineWidth = 2;
            ctx.setLineDash([5, 10]);
            ctx.beginPath(); ctx.arc(0, 0, 50 + Math.sin(time*3)*8, 0, Math.PI*2); ctx.stroke();
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 40; ctx.shadowColor = "#f06292";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♍", 0, 15);
            ctx.restore();
        }
    },
    "天秤宫": {
        color: "#4caf50",
        glow: "#8bc34a",
        symbol: "♎",
        draw: (ctx, boss) => {
            ctx.save();
            ctx.strokeStyle = "#4caf50"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(70, 0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, 40); ctx.stroke();
            // 机械托盘
            ctx.fillStyle = "#1a1a1e";
            ctx.fillRect(-80, 0, 20, 10); ctx.fillRect(60, 0, 20, 10);
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 30; ctx.shadowColor = "#8bc34a";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♎", 0, 15);
            ctx.restore();
        }
    },
    "天蝎宫": {
        color: "#9c27b0",
        glow: "#ff0000",
        symbol: "♏",
        draw: (ctx, boss) => {
            ctx.save();
            ctx.strokeStyle = "#9c27b0"; ctx.lineWidth = 6;
            ctx.lineCap = "round";
            // 机械蝎尾 (多段关节感)
            ctx.beginPath(); 
            ctx.moveTo(0, 25); ctx.quadraticCurveTo(60, 25, 50, -50); 
            ctx.stroke();
            // 关节节点
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            for(let i=0; i<4; i++) {
                ctx.beginPath(); ctx.arc(i*15, 25 - i*10, 4, 0, Math.PI*2); ctx.fill();
            }
            // 毒针核心
            ctx.fillStyle = "#ff0000"; ctx.shadowBlur = 20;
            ctx.beginPath(); ctx.moveTo(50, -50); ctx.lineTo(65, -65); ctx.lineTo(45, -70); ctx.fill();
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 35; ctx.shadowColor = "#ff0000";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♏", 0, 20);
            ctx.restore();
        }
    },
    "射手宫": {
        color: "#2196f3",
        glow: "#03a9f4",
        symbol: "♐",
        draw: (ctx, boss) => {
            ctx.save();
            ctx.strokeStyle = "#2196f3"; ctx.lineWidth = 4;
            // 机械复合弓
            ctx.beginPath(); ctx.arc(0, 0, 60, -Math.PI*0.8, -Math.PI*0.2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, -60); ctx.stroke();
            // 激光箭簇
            ctx.fillStyle = "#ffd700"; ctx.shadowBlur = 20;
            ctx.beginPath(); ctx.moveTo(0, -65); ctx.lineTo(-15, -45); ctx.lineTo(15, -45); ctx.fill();
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 35; ctx.shadowColor = "#03a9f4";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♐", 0, 20);
            ctx.restore();
        }
    },
    "摩羯宫": {
        color: "#795548",
        glow: "#4caf50",
        symbol: "♑",
        draw: (ctx, boss) => {
            ctx.save();
            ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#795548"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(-45, 40); ctx.lineTo(45, 40); ctx.closePath(); ctx.fill(); ctx.stroke();
            // 机械侧鳍
            ctx.strokeStyle = "#4caf50"; ctx.beginPath(); ctx.moveTo(-20, 40); ctx.quadraticCurveTo(-40, 60, -20, 80); ctx.stroke();
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 30; ctx.shadowColor = "#4caf50";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♑", 0, 15);
            ctx.restore();
        }
    },
    "水瓶宫": {
        color: "#00bcd4",
        glow: "#e0f7fa",
        symbol: "♒",
        draw: (ctx, boss) => {
            ctx.save();
            const time = Date.now() * 0.003;
            ctx.fillStyle = "#1a1a1e"; ctx.strokeStyle = "#00bcd4"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            // 动态流体装甲
            ctx.strokeStyle = "rgba(224, 247, 250, 0.3)";
            for(let i=0; i<3; i++) {
                const r = (time*20 + i*25) % 80;
                ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI*2); ctx.stroke();
            }
            
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 35; ctx.shadowColor = "#e0f7fa";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♒", 0, 15);
            ctx.restore();
        }
    },
    "双鱼宫": {
        color: "#3f51b5",
        glow: "#9c27b0",
        symbol: "♓",
        draw: (ctx, boss) => {
            ctx.save();
            const angle = Date.now() * 0.003;
            // 机械阴阳鱼
            [-1, 1].forEach(side => {
                const a = angle + (side === 1 ? 0 : Math.PI);
                const x = Math.cos(a)*60;
                const y = Math.sin(a)*60;
                ctx.fillStyle = side === 1 ? "#3f51b5" : "#9c27b0";
                ctx.beginPath(); ctx.ellipse(x, y, 12, 22, a + Math.PI/2, 0, Math.PI*2); ctx.fill();
                // 鱼眼灯
                ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y - side*5, 3, 0, Math.PI*2); ctx.fill();
            });
            ctx.fillStyle = "#fff"; ctx.shadowBlur = 35; ctx.shadowColor = "#3f51b5";
            ctx.font = "bold 45px 'Segoe UI Symbol'"; ctx.textAlign = "center";
            ctx.fillText("♓", 0, 15);
            ctx.restore();
        }
    }
};
