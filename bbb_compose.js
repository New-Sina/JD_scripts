

const $ = Env("步步宝APP");
$.idx = ($.idx = ($.getval('bbbSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1// 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 1;// 0为关闭通知，1为所有通知，


$.message = '', $.index = '', $.clocklog = '', COOKIES_SPLIT = '\n';

let CookieArr = ['{"imei": "866918037921992","ini": "27","version": "18","tokenstr": "9910D6F2EE3DFE8E44EDDA31B529330G1611547379","store": "0","platform": "1","Content-Type": "application/x-www-form-urlencoded","User-Agent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; OPPO R11 Build/OPM1.171019.011)","Host": "bububao.duoshoutuan.com","Connection": "Keep-Alive","Accept-Encoding": "gzip","Cookie": "PHPSESSID\u003d4sv1ojjc750s3e2dom4j26t956","Content-Length": "0"}',
'{"imei":"862305030206494","ini":"23","version":"18","tokenstr":"3C1319A83E2EAF61A0EA63360526571G1611126042","store":"0","platform":"1","Content-Type":"application/x-www-form-urlencoded","User-Agent":"Dalvik/2.1.0 (Linux; U; Android 6.0.1; Redmi Note 3 MIUI/V8.5.4.0.MHOCNED)","Host":"bububao.duoshoutuan.com","Connection":"Keep-Alive","Accept-Encoding":"gzip","Content-Length":"0"}',
'{"imei":"868256021128045","ini":"23","version":"18","tokenstr":"054F19B6E68C3537693B0CACC530135G1612223042","store":"0","platform":"1","Content-Type":"application/x-www-form-urlencoded","User-Agent":"Dalvik/2.1.0 (Linux; U; Android 6.0; Letv X500 Build/DBXCNOP5902812084S)","Host":"bububao.duoshoutuan.com","Connection":"Keep-Alive","Accept-Encoding":"gzip","Content-Length":"0"}']
let Length = CookieArr.length


//时间
now = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
const nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
ts = Math.round((new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000) / 1000).toString();
tts = Math.round(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();


function GetCookie() {
    if ($request && $request.method != `OPTIONS` && $request.url.indexOf('user/profile') >= 0) {
        const CookieVal = JSON.stringify($request.headers)
        if (CookieVal) $.setdata(CookieVal, 'bbb_ck')
        $.log(`CookieVal:${CookieVal}`)
        $.msg($.name, "获取Cookie成功")
    }
}
console.log(`================== 脚本执行 - 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} =====================\n`);
console.log(`============ 共 ${Length} 个${$.name}账号=============\n`);

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
    GetCookie()
} else {
    !(async () => {
        await all();
        await showmsg();
    })()
        .catch((e) => { $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '') })
        .finally(() => { $.done(); })
}


async function all() {
    if (!Length) {
        $.msg($.name, '提示：⚠️请点击前往获取cookie\n', '');
        return;
    }
    for (let i = 0; i < Length; i++) {
        CookieVal = CookieArr[i]
        O = (`${$.name + (i + 1)}🔔`);
        await console.log(`-------------------------\n\n🔔开始运行【${$.name + (i + 1)}】`)
        await userInfo()
        await signIn()
        await newHb()
        await zaoWanDkInfo()
        await checkWaterNum()
        await sleepStatus()
        // await clickTaskStatus()
        // await watchTaskStatus()
        // await helpStatus()
        await getNewsId()
        await getQuestionId()
        await guaList()
        await checkHomeJin()
        await checkLuckNum()
        await checkH5Id()
        await cashCheck()
        // await dhStep()


    }
}


// function dh() {
//     return new Promise((resolve, reject) => {
//         let dhs = {
//             url: `https://bububao.duoshoutuan.com/user/collsteps?`,
//             headers: JSON.parse(CookieVal),
//             body: `duihuan_dialog=0&`,
//         }
//         $.post(dhs, async (error, response, data) => {
//             const dh = JSON.parse(data)
//             if (dh.code == 1) {
//                 dhbd = dh.duihuan_dialog
//                 await dhStep()
//             }
//             resolve()
//         })
//     })
// }
function dhStep() {
    return new Promise((resolve, reject) => {
        let dhstep = {
            url: `https://bububao.duoshoutuan.com/user/collsteps?`,
            headers: JSON.parse(CookieVal),
            body: `duihuan_dialog=1&`,
        }
        $.post(dhstep, async (error, response, data) => {
            $.step = JSON.parse(data)
            if ($.step.code == 1) {
                $.message += `【步数兑换】${$.step.msg},获得金币:${$.step.jinbi}💰\n`;
            } else {
                $.message += `【步数兑换】${$.step.msg}\n`;
            }
            resolve()
        })
    })
}



// function donejin() {
//     return new Promise((resolve, reject) => {
//         let djin = {
//             url: `https://bububao.duoshoutuan.com/user/donejin?`,
//             headers: JSON.parse(CookieVal)
//         }
//         $.post(djin, async (error, response, data) => {
//             $.dj = JSON.parse(data)
//             if ($.dj.code == 1) {
//                 $.message += `【达标步数兑换】${$.dj.tip}${$.dj.msg},获得金币:${$.dj.jinbi}💰\n`;
//                 djStr = dj.nonce_str
//                 await djCallBack()
//             } else {
//                 $.messag += `【达标步数兑换】稍后兑换`
//             }
//             resolve()
//         })
//     })
// }
// function djCallBack() {
//     return new Promise((resolve, reject) => {
//         let djcallback = {
//             url: `https://bububao.duoshoutuan.com/you/callback`,
//             headers: JSON.parse(CookieVal),
//             body: `nonce_str=${djStr}&tid=20&pos=1&`,
//         }
//         $.post(djcallback, async (error, response, data) => {
//             const djcallback = JSON.parse(data)
//             if (djcallback.code == 1) {
//                 result += `【达标步数兑换】获得金币:${$.dj.jinbi}💰\n`;
//             } else {
//                 result += `【达标步数兑换】${djcallback.msg}💰\n`;
//             }
//             resolve()
//         })
//     })
// }



var getBoxId = (function () {
    var i = 0;
    return function () {
        return ++i;
    };
})();




//通知
function showmsg() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        resolve()
    })
}

// 账户信息
function userInfo(timeout = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let userInfo = {
                url: `https://bububao.duoshoutuan.com/user/profile`,
                headers: JSON.parse(CookieVal),
            }
            $.post(userInfo, async (error, response, data) => {
                try {
                    if (logs) $.log(`${O}, 账户信息🚩: ${data}`);
                    $.info = JSON.parse(data);
                    $.message += `\n${O}`;
                    $.message += `\n========== 【ID号:${$.info.uid},用户名:${$.info.username}】 ==========\n` +
                        `【现金余额】:${$.info.money}元,【今日收益】:${$.info.day_jinbi}💰,【当前步数】:${$.info.steps}步\n`;
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

// 签到
function signIn() {
    return new Promise((resolve, reject) => {
        let signin = {
            url: `https://bububao.duoshoutuan.com/user/sign`,
            headers: JSON.parse(CookieVal),
        }
        $.post(signin, async (error, response, data) => {
            $.log('\n🔔开始签到\n')
            const sign = JSON.parse(data)
            if (sign.code == 1) {
                $.message += `【每日签到】${sign.msg},获得金币:${sign.jinbi}💰\n`;
                signInStr = sign.nonce_str
                await signDouble()
            } else {
                $.message += `【每日签到】${sign.msg}\n`;
            }
            resolve()
        })
    })
}
function signDouble() {
    return new Promise((resolve, reject) => {
        let signdouble = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${signInStr}&tid=2&pos=1&`,
        }
        $.post(signdouble, async (error, response, data) => {
            const signin2 = JSON.parse(data)
            $.log('\n🔔开始领取每日观看奖励\n')
            if (signin2.code == 1) {
                $.log('\n🎉签到翻倍成功\n')
            } else {
                $.log('\n⚠️签到翻倍失败败:' + signin2.msg + '\n')
            }
            resolve()
        })
    })
}

// 打卡
function zaoWanDkInfo() {
    return new Promise((resolve, reject) => {
        let zaowandkinfo = {
            url: `https://bububao.duoshoutuan.com/mini/dk_info`,
            headers: JSON.parse(CookieVal),
        }
        $.post(zaowandkinfo, async (error, response, data) => {
            const zwdkinfo = JSON.parse(data)
            if (zwdkinfo.code == 1 && zwdkinfo.is_dk == 0) {
                nowTime = zwdkinfo.now_time
                title1 = zwdkinfo.title1
                title2 = zwdkinfo.title2
                await zaoWanDk()
            }
            resolve()
        })
    })
}
function zaoWanDk() {
    return new Promise((resolve, reject) => {
        let zaowandk = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=3&c_type=1&`,
        }
        $.post(zaowandk, async (error, response, data) => {
            const zwdk = JSON.parse(data)
            if (zwdk.code == 1) {
                zwdkStr = zwdk.nonce_str
                await $.wait(30000)
                await dkClick()
            }
            resolve()
        })
    })
}
function dkClick() {
    return new Promise((resolve, reject) => {
        let dkclick = {
            url: `https://bububao.duoshoutuan.com/mini/dk_click`,
            headers: JSON.parse(CookieVal),
            body: `now_time=${nowTime}&`,
        }
        $.post(dkclick, async (error, response, data) => {
            const clickdk = JSON.parse(data)
            if (clickdk.code == 1) {
                $.message += `【${title1}】获得金币:${clickdk.jinbi}💰\n`;
            } else {
                $.message += `【打卡任务】${clickdk.msg}\n`;
            }
            resolve()
        })
    })
}

// 答题
function getQuestionId() {
    return new Promise((resolve, reject) => {
        let getquestionid = {
            url: `https://bububao.duoshoutuan.com/mini/cy_info`,
            headers: JSON.parse(CookieVal),
        }
        $.post(getquestionid, async (error, response, data) => {
            const question = JSON.parse(data)
            if (question.code == 1 && question.day_num != 0) {
                questionSite = question.site
                questionId = question.cy_id
                spId = question.day_num
                if (question.is_sp == 1) {
                    await $.wait(5000)
                    await checkSp()
                } else {
                    await answerQue()
                }
            } else {
                $.message += `【答题任务】今日答题已上限\n`;
            }
            resolve()
        })
    })
}
function checkSp() {
    return new Promise((resolve, reject) => {
        let checksp = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=1&c_type=1&`,
        }
        $.post(checksp, async (error, response, data) => {
            const sp = JSON.parse(data)
            if (sp.code == 1) {
                spStr = sp.nonce_str
                await $.wait(5000)
                await cySp()
            }
            resolve()
        })
    })
}
function cySp() {
    return new Promise((resolve, reject) => {
        let cysp = {
            url: `https://bububao.duoshoutuan.com/mini/cy_sp`,
            headers: JSON.parse(CookieVal),
            body: `day_num=${spId}&`,
        }
        $.post(cysp, async (error, response, data) => {
            const sp = JSON.parse(data)
            if (sp.code == 1) {
                //await $.wait(5000)
                await answerQue()
            }
            resolve()
        })
    })
}
function answerQue() {
    return new Promise((resolve, reject) => {
        let answerque = {
            url: `https://bububao.duoshoutuan.com/mini/cy_click`,
            headers: JSON.parse(CookieVal),
            body: `cy_id=${questionId}&site=${questionSite}&`,
        }
        $.post(answerque, async (error, response, data) => {
            answer = JSON.parse(data)
            if (answer.code == 1) {
                $.message += `【答题任务】${answer.msg},获得金币:${answer.jinbi}💰\n`;
                answerStr = answer.nonce_str
                await $.wait(5000)
                await answerQueCallBack()
            } else {
                $.log('\n⚠️答题失败: ' + answer.msg + '\n')
            }
            resolve()
        })
    })
}
function answerQueCallBack() {
    return new Promise((resolve, reject) => {
        let answerquecallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${answerStr}&tid=18&pos=1&`,
        }
        $.post(answerquecallback, async (error, response, data) => {
            const answerback = JSON.parse(data)
            if (answerback.code == 1) {
                $.message += `【答题翻倍】获得金币:${answer.jinbi * answer.fb_num}💰\n`;
            } else {
                $.message += `【答题翻倍】${answerback.msg}💰\n`;
            }
            resolve()
        })
    })
}

// 喝水
function checkWaterNum() {
    return new Promise((resolve, reject) => {
        let checkwaternum = {
            url: `https://bububao.duoshoutuan.com/mini/water_info`,
            headers: JSON.parse(CookieVal),
        }
        $.post(checkwaternum, async (error, response, data) => {
            const waternum = JSON.parse(data)
            if (waternum.code == 1 && waternum.day_num < 7) {
                waterNum = waternum.day_num
                if (waternum.is_sp == 1) {
                    await $.wait(1000)
                    await checkWaterSp()
                } else {
                    await $.wait(1000)
                    await waterClick()
                }
            } else {
                $.message += `【喝水任务】今日喝水已上限\n`;
            }
            resolve()
        })
    })
}
function checkWaterSp() {
    return new Promise((resolve, reject) => {
        let checksp = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=2&c_type=1&`,
        }
        $.post(checksp, async (error, response, data) => {
            const sp = JSON.parse(data)
            if (sp.code == 1) {
                waterSpStr = sp.nonce_str
                await WaterSp()
            }
            resolve()
        })
    })
}
function WaterSp() {
    return new Promise((resolve, reject) => {
        let watersp = {
            url: `https://bububao.duoshoutuan.com/mini/water_sp`,
            headers: JSON.parse(CookieVal),
            body: `day_num=${waterNum}&`,
        }
        $.post(watersp, async (error, response, data) => {
            const spwater = JSON.parse(data)
            if (spwater.code == 1) {
                await $.wait(30000)
                await waterClick()
            }
            resolve()
        })
    })
}
function waterClick() {
    return new Promise((resolve, reject) => {
        let waterclick = {
            url: `https://bububao.duoshoutuan.com/mini/water_click`,
            headers: JSON.parse(CookieVal),
            body: `day_num=0${waterNum}&`,
        }
        $.post(waterclick, async (error, response, data) => {
            const clickwater = JSON.parse(data)
            if (clickwater.code == 1) {
                $.message += `【喝水任务】${clickwater.msg},获得金币:${clickwater.jinbi}💰\n`;
            }
            resolve()
        })
    })
}

// 睡觉
function sleepStatus() {
    return new Promise((resolve, reject) => {
        let sleepstatus = {
            url: `https://bububao.duoshoutuan.com/mini/sleep_info`,
            headers: JSON.parse(CookieVal),
        }
        $.post(sleepstatus, async (error, response, data) => {
            const slpstatus = JSON.parse(data)
            if (slpstatus.code == 1) {
                if (slpstatus.is_lq == 1 && now.getHours() >= 8 && now.getHours() <= 18) {
                    sleepStr = slpstatus.nonce_str
                    sleepId = slpstatus.taskid
                }
                if (slpstatus.is_sleep == 0 && slpstatus.is_lq == 0 && now.getHours() >= 20) {
                    await $.wait(3000)
                    await sleepStart()
                } else if ((slpstatus.is_sleep == 1 || slpstatus.is_sleep == 0) && slpstatus.is_lq == 1 && now.getHours() >= 8 && now.getHours() <= 12) {
                    await $.wait(5000)
                    await sleepEnd()
                } else if (slpstatus.is_sleep == 1 && slpstatus.is_lq == 1 && now.getHours() >= 22) {
                    $.log('⚠️睡觉的时候不要玩手机！！！')
                } else if (slpstatus.is_sleep == 0 && now.getHours() >= 18) {
                    $.log('😘这么早就准备睡觉了吗？是身体不舒服吗？要保重身体呀！')
                }
            }
            resolve()
        })
    })
}
function sleepStart() {
    return new Promise((resolve, reject) => {
        let sleepstart = {
            url: `https://bububao.duoshoutuan.com/mini/sleep_start`,
            headers: JSON.parse(CookieVal),
        }
        $.post(sleepstart, async (error, response, data) => {
            const startsleep = JSON.parse(data)
            if (startsleep.code == 1) {
                $.log('\n🎉睡觉成功！早睡早起身体好！\n')
            } else {
                $.log('\n⚠️睡觉失败败:' + startsleep.msg + '\n')
            }
            resolve()
        })
    })
}
function sleepEnd() {
    return new Promise((resolve, reject) => {
        let sleepend = {
            url: `https://bububao.duoshoutuan.com/mini/sleep_end`,
            headers: JSON.parse(CookieVal),
        }
        $.post(sleepend, async (error, response, data) => {
            const endsleep = JSON.parse(data)
            if (endsleep.code == 1) {
                $.log('\n🎉起床了！别睡了！\n')
                await sleepDone()
            } else {
                $.log('\n⚠️起床失败:' + endsleep.msg + '\n')
            }
            resolve()
        })
    })
}
function sleepDone() {
    return new Promise((resolve, reject) => {
        let sleepdone = {
            url: `https://bububao.duoshoutuan.com/mini/sleep_done`,
            headers: JSON.parse(CookieVal),
            body: `taskid=${sleepId}&nonce_str=${sleepStr}&`
        }
        $.post(sleepdone, async (error, response, data) => {
            const donesleep = JSON.parse(data)
            if (donesleep.code == 1) {
                result += `【睡觉任务】获得金币:${donesleep.jinbi}💰\n`;
            } else {
                result += `【睡觉任务】${donesleep.msg}\n`;
            }
            resolve()
        })
    })
}

// 刮刮卡
function guaList() {
    return new Promise((resolve, reject) => {
        let gualist = {
            url: `https://bububao.duoshoutuan.com/gua/gualist?`,
            headers: JSON.parse(CookieVal),
        }
        $.post(gualist, async (error, response, data) => {
            const guaid = JSON.parse(data)
            if (guaid.ka > 0) {
                for (guaId of guaid.list)
                    if (guaId.is_ad == 0) {
                        GID = guaId.id
                        await $.wait(5000)
                        await guaDet()
                    }
            } else {
                $.message += `【刮刮卡任务】刮刮卡已用完,请明天再刮吧‼️\n`;
            }
            resolve()
        })
    })
}
function guaDet() {
    return new Promise((resolve, reject) => {
        let guadet = {
            url: `https://bububao.duoshoutuan.com/gua/guadet?`,
            headers: JSON.parse(CookieVal),
            body: `gid=${GID}&`
        }
        $.post(guadet, async (error, response, data) => {
            const guasign = JSON.parse(data)
            if (response.statusCode == 200) {
                SIGN = guasign.sign
                GLID = guasign.glid
                await guaPost()
            }
            resolve()
        })
    })
}
function guaPost() {
    return new Promise((resolve, reject) => {
        let guapost = {
            url: `https://bububao.duoshoutuan.com/gua/guapost?`,
            headers: JSON.parse(CookieVal),
            body: `sign=${SIGN}&gid=${GID}&glid=${GLID}&`
        }
        $.post(guapost, async (error, response, data) => {
            guaka = JSON.parse(data)
            if (typeof guaka.jf === 'number') {
                guaStr = guaka.nonce_str
                $.messag += `【刮刮卡任务】刮出${guaka.tp}张相同图案,获得金币${guaka.jf}💰\n`;
                await $.wait(45000)
                await guaDouble()
            }
            resolve()
        })
    })
}
function guaDouble() {
    return new Promise((resolve, reject) => {
        let guadouble = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${guaStr}&tid=6&pos=1&`,
        }
        $.post(guadouble, async (error, response, data) => {
            const guaka2 = JSON.parse(data)
            if (guaka2.code == 1) {
                $.message += `【刮刮卡翻倍】获得金币${guaka.jf}💰\n`;
                await $.wait(2000)
                //await guaList()
            } else {
                $.message += `【刮刮卡翻倍】${guaka2.msg}\n`;
            }
            resolve()
        })
    })
}

// 抽奖
function checkLuckNum() {
    return new Promise((resolve, reject) => {
        let lucknum = {
            url: `https://bububao.duoshoutuan.com/user/lucky`,
            headers: JSON.parse(CookieVal),
        }
        $.post(lucknum, async (error, response, data) => {
            num = JSON.parse(data)
            if (num.lucky_num != 0) {
                $.log('\n🎉剩馀抽奖次数:' + num.lucky_num + ',1s后开始抽奖\n')
                await $.wait(5000)
                await luckyClick()

            } else if (num.lucky_num == 0) {
                await $.wait(1000)
                for (box of num.lucky_box) {
                    //$.log(box)
                    if (box != 2)
                        await luckyBox()
                    if (box == 2)
                        $.log('\n⚠️宝箱已开启\n')
                }
            }
            resolve()
        })
    })
}
function luckyClick() {
    return new Promise((resolve, reject) => {
        let luckclick = {
            url: `https://bububao.duoshoutuan.com/user/lucky_click`,
            headers: JSON.parse(CookieVal),
        }
        $.post(luckclick, async (error, response, data) => {
            lucky = JSON.parse(data)
            if (lucky.code == 1) {
                $.message += `【抽奖任务】🎉剩馀抽奖次数:${num.lucky_num},获得金币:${lucky.jinbi}💰\n`;
                luckyStr = lucky.nonce_str
                if (lucky.jinbi != 0) {
                    await $.wait(5000)
                    await luckyCallBack()
                } else {
                    await checkLuckNum()
                }
            }
            resolve()
        })
    })
}
function luckyCallBack() {
    return new Promise((resolve, reject) => {
        let luckycallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${luckyStr}&tid=16&pos=1&`,
        }
        $.post(luckycallback, async (error, response, data) => {
            const callback = JSON.parse(data)
            if (callback.code == 1) {
                $.message += `【抽奖翻倍】获得金币:${lucky.jinbi * lucky.fb_num}💰\n`;
                await $.wait(2000)
            } else {
                $.message += `【抽奖翻倍】${callback.msg}\n`;
            }
            resolve()
        })
    })
}
function luckyBox() {
    return new Promise((resolve, reject) => {
        let luckybox = {
            url: `https://bububao.duoshoutuan.com/user/lucky_box`,
            headers: JSON.parse(CookieVal),
            body: `box=${getBoxId()}&`,
        }
        $.post(luckybox, async (error, response, data) => {
            boxlucky = JSON.parse(data)
            if (boxlucky.code == 1) {
                $.message += `【幸运宝箱任务】获得金币:${boxlucky.jinbi}💰\n`;
                luckyBoxStr = boxlucky.nonce_str
                await $.wait(5000)
                await luckyBoxCallBack()
            } else {
                $.message += `【幸运宝箱任务】${boxlucky.msg}\n`;
            }
            resolve()
        })
    })
}
function luckyBoxCallBack() {
    return new Promise((resolve, reject) => {
        let luckyboxcallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${luckyBoxStr}&tid=16&pos=1&`,
        }
        $.post(luckyboxcallback, async (error, response, data) => {
            const boxcallback = JSON.parse(data)
            if (boxcallback.code == 1) {
                $.message += `【幸运宝箱翻倍】获得金币:${boxlucky.jinbi * boxlucky.fb_num}💰\n`;
                await $.wait(1000)
            } else {
                $.message += `【幸运宝箱翻倍】${boxcallback.msg}\n`;
            }
            resolve()
        })
    })
}

// 看看赚
function checkH5Id() {
    return new Promise((resolve, reject) => {
        let checkh5id = {
            url: `https://bububao.duoshoutuan.com/user/h5_list?`,
            headers: JSON.parse(CookieVal),
            body: `page=1&page_limit=50&`,
        }
        $.post(checkh5id, async (error, response, data) => {
            const checkh5 = JSON.parse(data)
            if (response.statusCode == 200) {
                for (ID of checkh5) {
                    if (ID.is_ok == 0) {
                        H5ID = ID.mini_id
                        await doTaskH5()
                    } else {
                        // return
                        $.message += `【看看赚任务】已全部完成‼️\n`;
                    }
                }
            }
            resolve()
        })
    })
}
function doTaskH5() {
    return new Promise((resolve, reject) => {
        let dotaskh5 = {
            url: `https://bububao.duoshoutuan.com/user/h5_news?`,
            headers: JSON.parse(CookieVal),
            body: `mini_id=${H5ID}&`,
        }
        $.post(dotaskh5, async (error, response, data) => {
            const doh5task = JSON.parse(data)
            if (response.body.indexOf('nonce_str') != -1) {
                H5Str = doh5task.nonce_str
                H5TaskID = doh5task.taskid
                await $.wait(30000)
                await upLoadTime()
            }
            resolve()
        })
    })
}
function upLoadTime() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let uploadtime = {
            url: `https://wapinformation.dfxwdc.com/wapreport/screen_show?encodedMsg=cWlkMTAyNjcJMTYxMDkxODY0MzAyMjkwNTYJbmV3cwllYXN0ZGF5X3dhcG5ld3MJanVuc2hpCWRmdHQtNzcxMjNkYWI3MC04YWFmCXRvdXRpYW8JaHR0cHM6Ly90b3V0aWFvLmVhc3RkYXkuY29tLwlqdW5zaGkJMQkxCTAJLy9taW5pLmVhc3RkYXkuY29tL21vYmlsZS8yMTAxMTYxMTU0MTE5NTU1NTE3NzcuaHRtbAl0b3V0aWFvCWp1bnNoaQ%3D%3D&_=1610918646639&jsonpcallback=Zepto${timestamp}`,
            headers: { "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Accept-Language": "zh-cn", "Connection": "keep-alive", "Host": "wapunionstatis.dfxwdc.com", "Referer": "https://toutiao.eastday.com/?qid=qid10267", "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", },
            timeout: 30000,
        }
        $.get(uploadtime, async (error, response, data) => {
            $.log('\nupLoadTime:' + timestamp + '\n' + data + '\n')
            await $.wait(30000)
            await h5Done()
            resolve()
        })
    })
}
function upLoadTime2() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let uploadtime = {
            url: `https://api.clotfun.online/tiger/getConfig/a0d2cb8e06bd53b0530f8786624999db?hdggHtmlId=675`,
            headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", },
            timeout: 30000,
        }
        $.get(uploadtime, async (error, response, data) => {
            $.log('\nupLoadTime2:' + data + '\n')
            await $.wait(30000)
            await h5Done()
            resolve()
        })
    })
}
function h5Done() {
    return new Promise((resolve, reject) => {
        let h5done = {
            url: `https://bububao.duoshoutuan.com/user/h5_newsdone`,
            headers: JSON.parse(CookieVal),
            body: `taskid=${H5TaskID}&nonce_str=${H5Str}&`,
            timeout: 35000,
        }
        $.post(h5done, async (error, response, data) => {
            doneh5 = JSON.parse(data)
            if (doneh5.code == 1) {
                $.message += `【看看赚任务】获得金币:${doneh5.jinbi}💰\n`;
                h5news = doneh5.fb_str
                await $.wait(5000)
                await h5callBack()
            } else {
                // break
                $.message += `【看看赚任务】${doneh5.msg}\n`;
            }
            resolve()
        })
    })
}
function h5callBack() {
    return new Promise((resolve, reject) => {
        let h5callback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${h5news}&tid=10&pos=1&`,
        }
        $.post(h5callback, async (error, response, data) => {
            const h5callback = JSON.parse(data)
            if (h5callback.code == 1) {
                $.message += `【看看赚翻倍】获得金币:${doneh5.jinbi * doneh5.fb_num}💰\n`;
                await $.wait(2000)
            } else {
                $.message += `【看看赚翻倍】${h5callback.msg}\n`;
            }
            resolve()
        })
    })
}


// 头条新闻
function getNewsId() {
    return new Promise((resolve, reject) => {
        let getnewsid = {
            url: 'https://bububao.duoshoutuan.com/user/news',
            headers: JSON.parse(CookieVal),
            body: `type_class=1&`
        }
        $.post(getnewsid, async (error, response, data) => {
            const newsid = JSON.parse(data)
            if (newsid.code == 1) {

                newsStr = newsid.nonce_str
                await $.wait(15000)
                await autoRead()
            } else {
                $.log('\n⚠️阅读失败: 今日阅读已上限\n')
            }
            resolve()
        })
    })
}
function autoRead() {
    return new Promise((resolve, reject) => {
        let autoread = {
            url: 'https://bububao.duoshoutuan.com/user/donenews',
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${newsStr}& `,
        }
        $.post(autoread, async (error, response, data) => {
            const read = JSON.parse(data)
            if (read.code == 1) {
                $.message += `【头条新闻】获得金币:${read.jinbi}💰\n`;
            } else {
                $.log('\n⚠️阅读失败:' + data + '\n')
            }
            resolve()
        })
    })
}


// else if (checkhomejb.right_st == 1) {
//     $.log('\n🔔开始查询首页金币状态\n')
//     $.log('\n🔔等待' + (checkhomejb.right_time + 5) + 's领取首页金币')
//     await $.wait(checkhomejb.right_time * 1000 + 5000)
//     await homeJin()
// } 
// else if (checkhomejb.right_st == 2 && checkhomejb.jindan_show == 1) {
//     $.log('\n🔔开始查询首页金蛋状态\n')
//     $.log('\n🔔等待' + (checkhomejb.jindan_djs + 5) + 's领取金蛋奖励')
//     await $.wait(checkhomejb.jindan_djs * 1000 + 5000)
//     await checkGoldEggId()
// } 
// else if (checkhomejb.right_st == 2 && checkhomejb.jindan_show == 2 && checkhomejb.hb_st == 1) {
//     $.log('\n🔔开始查询首页红包状态\n')
//     $.log('\n🔔等待' + (checkhomejb.hb_time + 5) + 's领取首页红包')
//     time = checkhomejb.hb_time + 5
//     for (let i = 1; i <= (time / 5); i++) {
//         (function () {
//             setTimeout(() => {
//                 $.log('\n⏱请等待' + ((time / 5 - i) * 5) + 's后领取首页红包\n')
//             }, 5000 * i);
//         })()
//     }
//     await $.wait(checkhomejb.hb_time * 1000 + 5000)
//     await checkRedBagId()
// } else if (checkhomejb.right_st == 2 && checkhomejb.jindan_show == 2 && checkhomejb.hb_st == 2) {
//     $.log('\n🔔首页金币状态:' + checkhomejb.right_text + '\n🔔首页红包状态:' + checkhomejb.hb_text + '\n🔔首页金蛋状态:' + checkhomejb.jindan_text + '\n')
// }











// 
function checkHomeJin() {
    return new Promise((resolve, reject) => {
        let checkhomejin = {
            url: 'https://bububao.duoshoutuan.com/user/home',
            headers: JSON.parse(CookieVal),
        }
        $.post(checkhomejin, async (error, response, data) => {
            checkhomejb = JSON.parse(data)
            if (checkhomejb.right_st == 0) {
                await homeJin()
            }
            if (checkhomejb.jindan_show == 0) {
                $.log('\n🔔开始查询首页金蛋状态\n')
                $.log('\n🔔等待' + (checkhomejb.jindan_djs + 5) + 's领取金蛋奖励')
                await $.wait(checkhomejb.jindan_djs * 1000 + 5000)
                await checkGoldEggId()
            }
            if (checkhomejb.hb_st == 0) {
                $.log('\n🔔开始查询首页红包状态\n')
                await checkRedBagId()
            }
            // if (checkhomejb.jinbi_st == 1) {
            //     await $.wait(2000)
            //     await dhStep()
            // }
            // if (checkhomejb.steps_btn_st == 1) {
            //     await $.wait(3000)
            //     await donejin()
            // }
            resolve()
        })
    })
}

function homeJin() {
    return new Promise((resolve, reject) => {
        let homejin = {
            url: 'https://bububao.duoshoutuan.com/user/homejin',
            headers: JSON.parse(CookieVal),
        }
        $.post(homejin, async (error, response, data) => {
            homejb = JSON.parse(data)
            if (homejb.code == 1) {
                $.message += `【首页金币任务】${homejb.msg},获得金币:${homejb.jinbi}💰\n`;
                homeJinStr = homejb.nonce_str
                await $.wait(20000)
                await homeJinCallBack()
            } else {
                $.message += `【首页金币任务】领取失败:${homejb.msg}\n`;
            }
            resolve()
        })
    })
}
function homeJinCallBack() {
    return new Promise((resolve, reject) => {
        let homejincallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${homeJinStr}&tid=21&pos=1&`,
        }
        $.post(homejincallback, async (error, response, data) => {
            const hmjcallback = JSON.parse(data)
            if (hmjcallback.code == 1) {
                $.message += `【首页金币翻倍】获得金币:${homejb.jinbi * homejb.fb_num}💰\n`;
            } else {
                $.message += `【首页金币翻倍】${hmjcallback.msg}💰\n`;
            }
            resolve()
        })
    })
}

function checkRedBagId() {
    return new Promise((resolve, reject) => {
        let checkredbagid = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=0&c_type=2&`,
        }
        $.post(checkredbagid, async (error, response, data) => {
            $.log('\n🔔开始查询首页红包ID\n')
            const code = JSON.parse(data)
            if (code.code == 1) {
                $.message += `【首页红包任务】获得金币:${checkhomejb.hb_jinbi}💰\n`;
                redBagStr = code.nonce_str
                await $.wait(20000)
                await redBagCallback()
            }
            resolve()
        })
    })
}
function redBagCallback() {
    return new Promise((resolve, reject) => {
        let redbagcallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${redBagStr}&tid=17&pos=1&`,
        }
        $.post(redbagcallback, async (error, response, data) => {
            const redbag = JSON.parse(data)
            if (redbag.code == 1) {
                $.message += `【首页红包翻倍】获得金币:${checkhomejb.hb_jinbi}💰\n`;
            } else {
                $.message += `【首页红包翻倍】${redbag.msg}\n`;
            }
            resolve()
        })
    })
}

function checkGoldEggId() {
    return new Promise((resolve, reject) => {
        let checkgoldeggid = {
            url: `https://bububao.duoshoutuan.com/user/jindan_click`,
            headers: JSON.parse(CookieVal),
        }
        $.post(checkgoldeggid, async (error, response, data) => {
            const goldeggid = JSON.parse(data)
            if (goldeggid.code == 1) {
                goldEggStr = goldeggid.nonce_str
                goldEggId = goldeggid.taskid
                await goldEggDone()
            } else {
                $.log('\n⚠️首页金蛋失败:' + goldeggid.msg + '\n')
            }
            resolve()
        })
    })
}
function goldEggDone() {
    return new Promise((resolve, reject) => {
        let timestamp = Date.parse(new Date()) / 1000;
        let goldeggdone = {
            url: `https://bububao.duoshoutuan.com/user/jindan_done`,
            headers: JSON.parse(CookieVal),
            body: `taskid=${goldEggId}&clicktime=${timestamp}&donetime=${timestamp}+1000&nonce_str=${goldEggStr}&`
        }
        $.post(goldeggdone, async (error, response, data) => {
            goldegg2 = JSON.parse(data)
            if (goldegg2.code == 1) {
                $.message += `【首页金蛋任务】获得金币:${goldegg2.jinbi}💰\n`;
                await goldEggCallback()
            } else {
                $.message += `【首页金蛋任务】${goldegg2.msg}\n`;
            }
            resolve()
        })
    })
}
function goldEggCallback() {
    return new Promise((resolve, reject) => {
        let goldeggcallback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${goldEggStr}&tid=5&pos=1&`,
        }
        $.post(goldeggcallback, async (error, response, data) => {
            const goldeggback = JSON.parse(data)
            if (goldeggback.code == 1) {
                $.message += `【首页金蛋翻倍】获得金币:${goldegg2.jinbi * goldegg2.fb_num}💰\n`;
            } else {
                $.message += `【首页金蛋翻倍】${goldeggback.msg}\n`;
            }
            resolve()
        })
    })
}


// function dhStep() {
//     return new Promise((resolve, reject) => {
//         let dhstep = {
//             url: `https://bububao.duoshoutuan.com/user/collsteps?`,
//             headers: JSON.parse(CookieVal),
//             body: `duihuan_dialog=1&`,
//         }
//         $.post(dhstep, async (error, response, data) => {
//             const step = JSON.parse(data)
//             if (step.code == 1) {
//                 $.message += `【步数兑换】${step.msg},获得金币:${step.jinbi}💰\n`;
//             } else {
//                 $.message += `【步数兑换】${step.msg}\n`;
//             }
//             resolve()
//         })
//     })
// }


// function donejin() {
//     return new Promise((resolve, reject) => {
//         let djin = {
//             url: `https://bububao.duoshoutuan.com/user/donejin?`,
//             headers: JSON.parse(CookieVal),
//         }
//         $.post(djin, async (error, response, data) => {
//             dj = JSON.parse(data)
//             if (dj.code == 1) {
//                 $.message += `【达标步数兑换】${dj.tip}${dj.msg},获得金币:${dj.jinbi}💰\n`;
//                 djStr = dj.nonce_str
//                 await djCallBack()
//             }
//         })
//     })
// }
// function djCallBack() {
//     return new Promise((resolve, reject) => {
//         let djcallback = {
//             url: `https://bububao.duoshoutuan.com/you/callback`,
//             headers: JSON.parse(CookieVal),
//             body: `nonce_str=${djStr}&tid=20&pos=1&`,
//         }
//         $.post(djcallback, async (error, response, data) => {
//             const djcallback = JSON.parse(data)
//             if (djcallback.code == 1) {
//                 $.message += `【达标步数兑换】获得金币:${dj.jinbi}💰\n`;
//             } else {
//                 $.message += `【达标步数兑换】${djcallback.msg}💰\n`;
//             }
//             resolve()
//         })
//     })
// }


// 助力
function helpStatus() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let helpstatus = {
            url: `https://bububao.duoshoutuan.com/user/help_index`,
            headers: JSON.parse(CookieVal),
        }
        $.post(helpstatus, async (error, response, data) => {
            const help = JSON.parse(data)
            if (help.status == 0) {
                $.log(`\n🔔查询当前差额:${help.diff_jinbi}元`)
                await checkCode()
            } else {
                $.log('\n🔔今日助力已上限,请明天再试!\n')
            }
            resolve()
        })
    })
}
function checkCode() {
    return new Promise((resolve, reject) => {
        let checkcode = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=5&c_type=1&`,
        }
        $.post(checkcode, async (error, response, data) => {
            const code = JSON.parse(data)
            if (code.code == 1) {
                nonce_str = code.nonce_str
                await helpClick()
            }
            resolve()
        })
    })
}
function helpClick() {
    return new Promise((resolve, reject) => {
        let helpclick = {
            url: `https://bububao.duoshoutuan.com/user/help_click`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${nonce_str}`,
        }
        $.post(helpclick, async (error, response, data) => {
            const help = JSON.parse(data)
            if (help.code == 1) {
                $.message += `【助力领现金】获得金币:${help.jinbi}💰\n`;
                await $.wait(30000)
                await callBack()
            } else {
                $.message += `【助力领现金】❎ ${help.msg}\n`;
            }
            resolve()
        })
    })
}
function callBack() {
    return new Promise((resolve, reject) => {
        let callback = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${nonce_str}&tid=22&pos=1&`,
        }
        $.post(callback, async (error, response, data) => {
            const back = JSON.parse(data)
            if (back.code == 1) {
                $.log('\n🎉领取助力视频奖励成功\n')
            } else {
                $.log('\n⚠️助力视频奖励失败:' + back.msg + '\n')
            }
            resolve()
        })
    })
}



// 首页弹窗红包
function newHb(timeout = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let newhb = {
                url: `https://bububao.duoshoutuan.com/user/newhb`,
                headers: JSON.parse(CookieVal),
                body: `invit=&`
            }
            $.post(newhb, async (error, response, data) => {
                try {
                    if (logs) $.log(`${O}, 红包🚩: ${data}`);
                    $.hb = JSON.parse(data)
                    if ($.hb.is_show == 1) {
                        await openNewhb()
                    } else if ($.hb.is_show == 0) {
                        $.log(`暂时没有可开红包🧧`)
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
function openNewhb(timeout = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let openhb = {
                url: `https://bububao.duoshoutuan.com/user/open_newhb`,
                headers: JSON.parse(CookieVal)
            }
            $.post(openhb, async (error, response, data) => {
                try {
                    if (logs) $.log(`${O}, 开红包🚩: ${data}`);
                    $.openhb = JSON.parse(data)
                    if ($.openhb.code == 1) {
                        $.message += `【首页弹窗红包】${$.openhb.msg},获得现金:${$.openhb.money}元\n`;
                    } else {
                        $.message += `【首页弹窗红包】已领取\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


function clickTaskStatus() {
    return new Promise((resolve, reject) => {
        let clicktaskstatus = {
            url: `https://bububao.duoshoutuan.com/user/renwu`,
            headers: JSON.parse(CookieVal),
            body: `idfa=${JSON.parse(CookieVal)['idfa']}&`,
        }
        $.post(clicktaskstatus, async (error, response, data) => {
            const clicktask = JSON.parse(data)
            if (clicktask.first.admobile_st != 2) {
                $.log('\n🔔开始查询每日点击任务状态\n')
                await checkDailyClickAdId()
            } else {
                $.log('\n⚠️每日点击广告任务已上限\n')
            }
            resolve()
        })
    })
}
function watchTaskStatus() {
    return new Promise((resolve, reject) => {
        let watchtaskstatus = {
            url: `https://bububao.duoshoutuan.com/user/renwu`,
            headers: JSON.parse(CookieVal),
            body: `idfa=${JSON.parse(CookieVal)['idfa']}&`,
        }
        $.post(watchtaskstatus, async (error, response, data) => {
            const watchtask = JSON.parse(data)
            $.log('\n🔔开始查询每日观看广告任务状态\n')
            if (watchtask.v_st != 2) {
                $.log('\n🔔每日观看广告任务状态查询成功,1s后查询每日观看广告ID\n')
                await $.wait(1000)
                await checkDailyWatchAdId()
            } else {
                $.log('\n⚠️每日看广告任务已上限\n')
            }
            resolve()
        })
    })
}
function checkDailyWatchAdId() {
    return new Promise((resolve, reject) => {
        let checkdailywatchadid = {
            url: `https://bububao.duoshoutuan.com/user/chuansj`,
            headers: JSON.parse(CookieVal),
            body: `mini_pos=0&c_type=1&`,
        }
        $.post(checkdailywatchadid, async (error, response, data) => {
            $.log('\n🔔开始查询每日观看广告ID\n')
            const dailywatchid = JSON.parse(data)
            if (dailywatchid.code == 1) {
                dailyWatchStr = dailywatchid.nonce_str
                // $.log('\n'+dailyWatchStr+'\n')
                $.log('\n🎉查询成功,30s后领取奖励\n')
                await $.wait(30000)
                await DailyWatchAd()
            }
            resolve()
        })
    })
}
function DailyWatchAd() {
    return new Promise((resolve, reject) => {
        let dailywatchad = {
            url: `https://bububao.duoshoutuan.com/you/callback`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${dailyWatchStr}&tid=9&pos=1&`,
        }
        $.post(dailywatchad, async (error, response, data) => {
            const dailywatch = JSON.parse(data)
            $.log('\n🔔开始领取每日观看奖励\n')
            if (dailywatch.code == 1) {
                $.log('\n🎉每日观看奖励领取成功,5m(300s)后查询下一次广告\n')
                for (let i = 1; i <= 60; i++) {
                    (function () {
                        setTimeout(() => {
                            $.log('\n⏱请等待' + (60 - i) * 5 + 's后查询下一次广告\n')
                        }, 5000 * i);
                    })()
                }
                // await $.wait(300000)
                // await watchTaskStatus()
            } else {
                $.log('\n⚠️每日奖励领取失败:' + dailywatch.msg + '\n')
            }
            resolve()
        })
    })
}
function checkDailyClickAdId() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let checkdailyclickadid = {
            url: `https://bububao.duoshoutuan.com/user/admobile_show`,
            headers: JSON.parse(CookieVal),
        }
        $.post(checkdailyclickadid, async (error, response, data) => {
            $.log('\n🔔开始查询每日广告ID\n')
            const dailyclickid = JSON.parse(data)
            if (dailyclickid.code == 1) {
                dailyClickAdId = dailyclickid.ad_id
                // $.log('\n'+dailyClickAdId+'\n')
                $.log('\n🎉查询成功,1s后领取奖励\n')
                await $.wait(1000)
                await checkDailyClickAd()
            }
            resolve()
        })
    })
}
function checkDailyClickAd() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let checkdailyclickad = {
            url: `https://bububao.duoshoutuan.com/user/admobile_click`,
            headers: JSON.parse(CookieVal),
            body: `ad_id=${dailyClickAdId}&`,
        }
        $.post(checkdailyclickad, async (error, response, data) => {
            $.log('\n🔔开始查询每日广告点击ID\n')
            const dailyclick = JSON.parse(data)
            if (dailyclick.code == 1) {
                dailyClickStr = dailyclick.nonce_str
                // $.log('\n'+dailyClickStr+'\n')
                $.log('\n🎉查询成功,5s后返回领取奖励\n')
                await $.wait(5000)
                await DailyClickAd()
            }
            resolve()
        })
    })
}
function DailyClickAd() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let dailyclickad = {
            url: `https://bububao.duoshoutuan.com/user/admobile_done`,
            headers: JSON.parse(CookieVal),
            body: `nonce_str=${dailyClickStr}&ad_id=${dailyClickAdId}&`,
        }
        $.post(dailyclickad, async (error, response, data) => {
            const dailyclick = JSON.parse(data)
            $.log('\n🔔开始领取每日点击奖励\n')
            if (dailyclick.code == 1) {
                $.log('\n🎉每日点击奖励领取成功,1s后查询下一次广告ID\n')
                // await $.wait(1000)
                // await clickTaskStatus()
            } else {
                $.log('\n⚠️每日点击领取失败:' + dailyclick.msg + '\n')
            }
            resolve()
        })
    })
}


function cashCheck() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let cashcheck = {
            url: 'https://bububao.duoshoutuan.com/user/profile',
            headers: JSON.parse(CookieVal),
        }
        $.post(cashcheck, async (error, response, data) => {
            const cash = JSON.parse(data)
            if (response.statusCode == 200 && cash.code != -1) {
                if (cash.jinbi >= 500000) {
                    tip = 50
                    await withDraw()
                } else if (cash.day_jinbi > 5000) {
                    tip = 0.3
                    await withDraw()
                }
            }
            resolve()
        })
    })
}
function withDraw() {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let withdraw = {
            url: `https://bububao.duoshoutuan.com/user/tixian?`,
            headers: JSON.parse(CookieVal),
            body: `tx=${tip}&`,
        }
        $.post(withdraw, async (error, response, data) => {
            $.log(data)
            const draw = JSON.parse(data)
            if (withdraw.code == 1) {
                $.message += `【提现任务】\n${draw.tip},${draw.msg}\n`;
                // $.msg(draw.msg)
            } else {
                $.message += `【提现任务】\n${draw.tip},${draw.msg}\n`;
            }
            resolve()
        })
    })
}






// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, ``).trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, ``) : e } catch (t) { e = `` } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length))); return t } msg(e = t, s = ``, i = ``, r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
