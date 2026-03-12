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
        icon: "https://img.icons8.com/fluency/96/aries.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            } else {
                // 降级方案：发光核心
                ctx.fillStyle = "#ff4b2b"; ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI*2); ctx.fill();
            }
        }
    },
    "金牛宫": {
        color: "#8d6e63",
        glow: "#ffd700",
        icon: "https://img.icons8.com/fluency/96/taurus.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            } else {
                ctx.fillStyle = "#8d6e63"; ctx.beginPath(); ctx.arc(0, 0, 35, 0, Math.PI*2); ctx.fill();
            }
        }
    },
    "双子宫": {
        color: "#03a9f4",
        glow: "#00ffff",
        icon: "https://img.icons8.com/fluency/96/gemini.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "巨蟹宫": {
        color: "#e0e0e0",
        glow: "#ffffff",
        icon: "https://img.icons8.com/fluency/96/cancer.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "狮子宫": {
        color: "#ffd700",
        glow: "#ff9800",
        icon: "https://img.icons8.com/fluency/96/leo.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "处女宫": {
        color: "#e91e63",
        glow: "#f06292",
        icon: "https://img.icons8.com/fluency/96/virgo.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "天秤宫": {
        color: "#4caf50",
        glow: "#8bc34a",
        icon: "https://img.icons8.com/fluency/96/libra.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "天蝎宫": {
        color: "#9c27b0",
        glow: "#ff0000",
        icon: "https://img.icons8.com/fluency/96/scorpio.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "射手宫": {
        color: "#2196f3",
        glow: "#03a9f4",
        icon: "https://img.icons8.com/fluency/96/sagittarius.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "摩羯宫": {
        color: "#795548",
        glow: "#4caf50",
        icon: "https://img.icons8.com/fluency/96/capricorn.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "水瓶宫": {
        color: "#00bcd4",
        glow: "#e0f7fa",
        icon: "https://img.icons8.com/fluency/96/aquarius.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    },
    "双鱼宫": {
        color: "#3f51b5",
        glow: "#9c27b0",
        icon: "https://img.icons8.com/fluency/96/pisces.png",
        draw: (ctx, boss) => {
            if (boss.img && boss.img.complete) {
                ctx.drawImage(boss.img, -45, -45, 90, 90);
            }
        }
    }
};
