$(document).ready(function () {
    var interval,progressInterval;

///////Start button /////////

    $(document).on("click", "#start-btn", function() {
        $("#start-btn").attr("disabled", "disabled");
        var $seconds = $("#seconds>span").text("10");
        var test = 100;
        var timer;
        setTimeout(function() {
            $("#progressbar").attr("value", 100);
        }, 600);
        setTimeout(function() {
            interval = setInterval(function() {
                timer = +$seconds.text() - 1;
                if ($seconds.text() == 0) {
                    clearInterval(interval);
                    $("#start-btn").removeAttr("disabled", "disabled");
                } else {
                    $seconds.text("0" + timer);
                }
            }, 1000);
        }, 500);
        setTimeout(function() {
            progressInterval = setInterval(function() {
                if (test === 0) {
                    clearInterval(progressInterval);
                } else {
                    test--;
                    $("#progressbar").attr("value", test);
                }
            }, 100);
        }, 1000);
    });

///////Pause button /////////

    $(document).on("click", "#stop-btn", function() {
        var $seconds = $("#seconds>span").text();
        clearInterval(interval);
        clearInterval(progressInterval);
        $($seconds).text($seconds);
        $("#start-btn").removeAttr("disabled", "disabled");
    });

///////Reset button /////////

    $(document).on("click", "#reset-btn", function() {
        clearInterval(interval);
        clearInterval(progressInterval);
        $("#seconds>span").text("00");
        $("#progressbar").attr("value", 0);
        $("#start-btn").removeAttr("disabled", "disabled");
    });

//////time //////////

    setInterval(function() {
        var date = new Date();
        var day = date.getDay();
        var dayOfMonth = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        $("#time>:first>:first").text(hours + ":");
        if (minutes <= 9) {
            $("#time>:first>:eq(2)").text("0" + minutes);
        } else {
            $("#time>:first>:eq(1)").text(minutes + ":");
        }
        if (seconds <= 9) {
            $("#time>:first>:eq(2)").text("0" + seconds);
        } else {
            $("#time>:first>:eq(2)").text(seconds);
        }
        $("#time>:eq(1)>:first").text(dayOfMonth);

        ////////Day ///////////

        if (day === 0) {
            $("#time>:eq(1)>:eq(1)").text("Sunday");
        }
        if (day === 1) {
            $("#time>:eq(1)>:eq(1)").text("Monday");
        }
        if (day === 2) {
            $("#time>:eq(1)>:eq(1)").text("Tuesday");
        }
        if (day === 3) {
            $("#time>:eq(1)>:eq(1)").text("Wednesday");
        }
        if (day === 4) {
            $("#time>:eq(1)>:eq(1)").text("Thursday");
        }
        if (day === 5) {
            $("#time>:eq(1)>:eq(1)").text("Friday");
        }
        if (day === 6) {
            $("#time>:eq(1)>:eq(1)").text("Saturday");
        }
    }, 1000);

///////////Stopwatch start button ///////////

    var  seconds,minutes, millisecondsInterval,secondsMinutesInterval,memoryMinutes,memorySeconds,memoryMilliseconds;
    var ifPause = false;
    $("#stopwatch-lap-bnt").attr("disabled","disabled");

    $(document).on("click" ,"#stopwatch-start-bnt", function () {
        $("#stopwatch-lap-bnt").removeAttr("disabled","disabled");
        if (ifPause == true){
            $("#stopwatch-start-bnt").css("display" , "none");
            $("#stopwatch-stop-bnt").css("display" , "block");
            seconds = memorySeconds;
            minutes = memoryMinutes;

            /////Milliseconds////

            millisecondsInterval  = setInterval (function(){
                var date = new Date ();
                var milliseconds = date.getMilliseconds()/10;
                $("#nums-stopwatch-container>:last>p").text(milliseconds.toFixed(0));
                if (minutes > 59){
                    clearInterval(secondsMinutesInterval);
                    clearInterval(millisecondsInterval);
                    $("#nums-stopwatch-container>:last>p").text("00 ")
                }
            },80);

            /////Seconds and minutes////

            secondsMinutesInterval = setInterval (function(){

                if (seconds == 59){
                    seconds = 0;
                    minutes++;
                    if (minutes < 10){
                        $("#nums-stopwatch-container>:first>p").text("0" + minutes);
                    }
                    else {
                        $("#nums-stopwatch-container>:first>p").text(minutes);
                    }
                }
                else {
                    seconds++;
                }
                if (seconds < 10){
                    $("#nums-stopwatch-container>:eq(1)>p").text("0"+seconds) ;
                }
                else {
                    $("#nums-stopwatch-container>:eq(1)>p").text(seconds);
                }
            },1000);
        }
        else {
            $("#stopwatch-start-bnt").css("display" , "none");
            $("#stopwatch-stop-bnt").css("display" , "block");
            $("#nums-stopwatch-container>:first>p").text("00");
            $("#nums-stopwatch-container>:eq(1)>p").text("00");
            $("#nums-stopwatch-container>:last>p").text("00");

            seconds = 0;
            minutes = 0;

            /////Milliseconds////

            millisecondsInterval = setInterval(function() {
                var date = new Date();
                var milliseconds = date.getMilliseconds() / 10;
                $("#nums-stopwatch-container>:last>p").text(milliseconds.toFixed(0));
                if (minutes > 59) {
                    clearInterval(secondsMinutesInterval);
                    clearInterval(millisecondsInterval);
                    $("#nums-stopwatch-container>:last>p").text("00 ");
                }
            }, 80);

            /////Seconds and minutes////

            secondsMinutesInterval = setInterval (function(){

                if (seconds == 59){
                    seconds = 0;
                    minutes++;
                    if (minutes < 10){
                        $("#nums-stopwatch-container>:first>p").text("0" + minutes);
                    }
                    else {
                        $("#nums-stopwatch-container>:first>p").text(minutes);
                    }
                }
                else {
                    seconds++;
                }
                if (seconds < 10){
                    $("#nums-stopwatch-container>:eq(1)>p").text("0"+seconds) ;
                }
                else {
                    $("#nums-stopwatch-container>:eq(1)>p").text(seconds);
                }
            },1000);
        }

    });

    ///////////Stopwatch stop button ///////////

    $(document).on("click", "#stopwatch-stop-bnt", function() {
        $("#stopwatch-lap-bnt").attr("disabled", "disabled");
        $("#stopwatch-start-bnt").css("display", "block");
        $("#stopwatch-stop-bnt").css("display", "none");
        clearInterval(secondsMinutesInterval);
        clearInterval(millisecondsInterval);
        ifPause = true;
        memoryMinutes = $("#nums-stopwatch-container>:first>p").text();
        memorySeconds = $("#nums-stopwatch-container>:eq(1)>p").text();
        memoryMilliseconds = $("#nums-stopwatch-container>:last>p").text();
    });

    ///////////Stopwatch lap button ///////////

    $(document).on("click", "#stopwatch-lap-bnt", function() {
        var memoryMinutes = $("#nums-stopwatch-container>:first>p").text();
        var memorySeconds = $("#nums-stopwatch-container>:eq(1)>p").text();
        var memoryMilliseconds = $("#nums-stopwatch-container>:last>p").text();
        var div = document.createElement("div");
        $(div).addClass("lap-box");
        $("#laps-container").append(div);
        var deleteIcon = document.createElement("div");
        $(deleteIcon).addClass("delete-icon");
        var span = document.createElement("span");
        $("#laps-container>:last").append(span);
        $("#laps-container>:last").append(deleteIcon);
        $(div).animate({
                right: 0,
                opacity: 1
            }, 300);
        if (memoryMilliseconds < 10) {
            $("#laps-container>:last>span").text(
                memoryMinutes + ":" + memorySeconds + ":" + "0" + memoryMilliseconds
            );
        } else {
            $("#laps-container>:last>span").text(
                memoryMinutes + ":" + memorySeconds + ":" + memoryMilliseconds
            );
        }
    });

    ///////////Reset button ///////////

    $(document).on("click", "#stopwatch-reset-bnt", function() {
        $("#stopwatch-lap-bnt").attr("disabled", "disabled");
        $("#stopwatch-start-bnt").css("display", "block");
        $("#stopwatch-stop-bnt").css("display", "none");
        $("#nums-stopwatch-container>:first>p").text("00");
        $("#nums-stopwatch-container>:eq(1)>p").text("00");
        $("#nums-stopwatch-container>:last>p").text("00");
        clearInterval(secondsMinutesInterval);
        clearInterval(millisecondsInterval);
        $(".lap-box").animate({
                right: "300px",
                opacity: 0
            }, 300);
        setTimeout(function() {
            $(".lap-box").remove();
        }, 300);
    });

    ///////////Delete lap button ///////////

    $(document).on("click", ".delete-icon", function(event) {
        var eventTarget = event.target;
        $(this).parent().animate({
                right: "300px",
                opacity: 0
            }, 300);

        setTimeout(function() {
            $(eventTarget).parent().remove();
        }, 280);
    });
});
