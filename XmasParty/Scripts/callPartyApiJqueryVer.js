$(document).ready(function () {

    $("#btnMix").click(function () {
        var formObj = this.form;
        var obj = formObj.employee;
        var selected = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                selected.push(obj[i].value);
            }
        }

        if (selected.length != 2) {
            alert("Please check 2 seed members.")
        }

        $.ajax({
            async: true,
            cache: true,
            type: "POST",
            url: "api/RandomMember2?seedid1=" + selected[0] + "&seedid2=" + selected[1],
            dataType: "json",
            context: document.body,
            contentType: 'application/json; charset=utf-8',
            timeout: 60000,
            success: function (data) {
                //console.log(JSON.stringify(data));

                var seeds = data.filter(function (e) { return e.seed == true; });

                $("#R141member1").text(seeds[0].name);
                $("#R141member2").text(seeds[1].name);
                $("#R1S").css('visibility', 'visible').hide().fadeIn(2000);
                $("#G0name").css('visibility', 'visible').hide().fadeIn(2000);
            },

            error: function (xmlHttpRequest, statusText, errorThrown) {
                console.log('Your form submission failed.\n\n'
                    + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                    + ',\nStatus Text: ' + statusText
                    + ',\nError Thrown: ' + errorThrown);
            },

            complete: function (xmlHttpRequest, statusText) {
                //console.log('Your form submission completed.\n\n'
                //    + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                //    + ',\nStatus Text: ' + statusText);
            }
        })
    });

    $("#btnMatch").click(function () {

        $.fancybox.open({
            src: "/image/rolling.gif",
            opts: {
                toolbar: false,
                smallBtn: true
            }
        });
        //$.fancybox.open('<div><img src="/image/rolling.gif"/></div>');

        $.ajax({
            async: true,
            type: "POST",
            url: "api/Match",
            dataType: "json",
            context: document.body,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            //console.log(JSON.stringify(data));

            //$("#matchse")[0].play();
            $("#matchse").get(0).play();

            sleep(4000).then(() => {
                
                $.fancybox.close(true);
                var jobj = data;

                $("#G1name").text(jobj[0].gamename);
                $("#G2name").text(jobj[1].gamename);
                $("#G3name").text(jobj[2].gamename);
                $("#G11teaminput").val(jobj[0].team1);
                $("#G12teaminput").val(jobj[0].team2);
                $("#G21teaminput").val(jobj[1].team1);
                $("#G22teaminput").val(jobj[1].team2);
                $("#G31teaminput").val(jobj[2].team1);
                $("#G32teaminput").val(jobj[2].team2);
                $("#G11member1").text(jobj[0].team1member1);
                $("#G11member2").text(jobj[0].team1member2);
                $("#G12member1").text(jobj[0].team2member1);
                $("#G12member2").text(jobj[0].team2member2);
                $("#G21member1").text(jobj[1].team1member1);
                $("#G21member2").text(jobj[1].team1member2);
                $("#G22member1").text(jobj[1].team2member1);
                $("#G22member2").text(jobj[1].team2member2);
                $("#G31member1").text(jobj[2].team1member1);
                $("#G31member2").text(jobj[2].team1member2);
                $("#G32member1").text(jobj[2].team2member1);
                $("#G32member2").text(jobj[2].team2member2);
                $("#G11team").attr("src", "/image/" + jobj[0].team1 + ".gif");
                $("#G12team").attr("src", "/image/" + jobj[0].team2 + ".gif");
                $("#G21team").attr("src", "/image/" + jobj[1].team1 + ".gif");
                $("#G22team").attr("src", "/image/" + jobj[1].team2 + ".gif");
                $("#G31team").attr("src", "/image/" + jobj[2].team1 + ".gif");
                $("#G32team").attr("src", "/image/" + jobj[2].team2 + ".gif");
                $("#R1-1").css('visibility', 'visible').hide().fadeIn(3000, "linear");
                $("#G11team").animate({ height: "300px", width: "300px" }, "slow");
                $("#G12team").animate({ height: "300px", width: "300px" }, "slow");
                $("#G11team").animate({ height: "70px", width: "70px" }, "slow");
                $("#G12team").animate({ height: "70px", width: "70px" }, "slow");
                $("#R1-2").css('visibility', 'visible').delay("2000").hide().fadeIn(3000, "linear");
                $("#G21team").delay("2000").animate({ height: "300px", width: "300px" }, "slow");
                $("#G22team").delay("2000").animate({ height: "300px", width: "300px" }, "slow");
                $("#G21team").animate({ height: "70px", width: "70px" }, "slow");
                $("#G22team").animate({ height: "70px", width: "70px" }, "slow");
                $("#R1-3").css('visibility', 'visible').delay("4000").hide().fadeIn(3000, "linear");
                $("#G31team").delay("4000").animate({ height: "300px", width: "300px" }, "slow");
                $("#G32team").delay("4000").animate({ height: "300px", width: "300px" }, "slow");
                $("#G31team").animate({ height: "70px", width: "70px" }, "slow");
                $("#G32team").animate({ height: "70px", width: "70px" }, "slow");
                $("#R1btn").css('visibility', 'visible').delay("4000").hide().fadeIn(3000, "linear");
                $("#G1name").css('visibility', 'visible').hide().fadeIn(3000, "linear");
                $("#G2name").css('visibility', 'visible').hide().delay("2000").fadeIn(3000, "linear");
                $("#G3name").css('visibility', 'visible').hide().delay("4000").fadeIn(3000, "linear");
            })
        }).fail(function (xmlHttpRequest, statusText, errorThrown) {
            console.log('Your form submission failed.\n\n'
                + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                + ',\nStatus Text: ' + statusText
                + ',\nError Thrown: ' + errorThrown);
        });
    });

    $("#btnSaveR1result").click(function () {
        var formObj = this.form;
        var obj1 = formObj.R11winner;
        var selected1 = [];
        for (var i = 0; i < obj1.length; i++) {
            if (obj1[i].checked) {
                selected1.push(obj1[i].value);
            }
        }

        var obj2 = formObj.R12winner;
        var selected2 = [];
        for (var i = 0; i < obj2.length; i++) {
            if (obj2[i].checked) {
                selected2.push(obj2[i].value);
            }
        }

        var obj3 = formObj.R13winner;
        var selected3 = [];
        for (var i = 0; i < obj3.length; i++) {
            if (obj3[i].checked) {
                selected3.push(obj3[i].value);
            }
        }

        $.ajax({
            async: true,
            type: "POST",
            url: "api/R1?winteam1=" + selected1[0] + "&winteam2=" + selected2[0] + "&winteam3=" + selected3[0],
            dataType: "json",
            context: document.body,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            //console.log(JSON.stringify(data));
            var jobj = data;

            $("#G4name").text(jobj[3].gamename);
            $("#G5name").text(jobj[4].gamename);
            $("#G41teaminput").val(jobj[0].winner);
            $("#G42teaminput").val(jobj[1].winner);
            $("#G51teaminput").val(jobj[2].winner);
            $("#G41team").attr("src", "/image/" + jobj[0].winner + ".gif");
            $("#G42team").attr("src", "/image/" + jobj[1].winner + ".gif");
            $("#G51team").attr("src", "/image/" + jobj[2].winner + ".gif");
            $("#R2").css('visibility', 'visible').hide().fadeIn(2000);
            $("#R2Game").css('visibility', 'visible').hide().fadeIn(2000);
        }).fail(function (xmlHttpRequest, statusText, errorThrown) {
            console.log('Your form submission failed.\n\n'
                + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                + ',\nStatus Text: ' + statusText
                + ',\nError Thrown: ' + errorThrown);
        })
    });

    $("#btnSaveR2result").click(function () {
        var formObj = this.form;
        var obj1 = formObj.R21winner;
        var selected1 = [];
        for (var i = 0; i < obj1.length; i++) {
            if (obj1[i].checked) {
                selected1.push(obj1[i].value);
            }
        }

        var obj2 = formObj.R22winner;
        var selected2 = [];
        for (var i = 0; i < obj2.length; i++) {
            if (obj2[i].checked) {
                selected2.push(obj2[i].value);
            }
        }

        $.ajax({
            async: true,
            type: "POST",
            url: "api/R2?winteam1=" + selected1[0] + "&winteam2=" + selected2[0],
            dataType: "json",
            context: document.body,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            //console.log(JSON.stringify(data));
            var jobj = data;
            $("#G6name").text(jobj[5].gamename);
            $("#G61teaminput").val(jobj[3].winner);
            $("#G62teaminput").val(jobj[4].winner);
            $("#G61team").attr("src", "/image/" + jobj[3].winner + ".gif");
            $("#G62team").attr("src", "/image/" + jobj[4].winner + ".gif");
            $("#R3").css('visibility', 'visible').hide().fadeIn(2000);
            $("#R3Game").css('visibility', 'visible').hide().fadeIn(2000);
        }).fail(function (xmlHttpRequest, statusText, errorThrown) {
            console.log('Your form submission failed.\n\n'
                + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                + ',\nStatus Text: ' + statusText
                + ',\nError Thrown: ' + errorThrown);
        })
    });

    $("#btnSaveR3result").click(function () {
        var formObj = this.form;
        var obj = formObj.R31winner;
        var selected = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                selected.push(obj[i].value);
            }
        }

        $.ajax({
            async: true,
            type: "POST",
            url: "api/R3?winteam1=" + selected[0],
            dataType: "json",
            context: document.body,
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            //console.log(JSON.stringify(data));
            //$("#gamblegod")[0].play();
            $("#gamblegod").get(0).play();
            var jobj = data;

            $("#winner").attr("src", "/image/" + jobj[5].winner + ".gif");
            $("#final").css('visibility', 'visible').hide().fadeIn(2000);

        }).fail(function (xmlHttpRequest, statusText, errorThrown) {
            console.log('Your form submission failed.\n\n'
                + 'XML Http Request: ' + JSON.stringify(xmlHttpRequest)
                + ',\nStatus Text: ' + statusText
                + ',\nError Thrown: ' + errorThrown);
        })
    });

    $('[data-fancybox="images"]').fancybox({
        buttons: [
            'slideShow',
            'fullScreen',
            'thumbs',
            'share',
            "download",
            'zoom',
            'close'

        ],
        opacity: true,
        autoScale: true,
        transitionIn: 'elastic',
        transitionOut: 'elastic',
        loop: true,
        infobar: false,
        caption: function (instance, item) {
            var caption = $(this).data('caption') || '';

            return (caption.length ? caption + '<br />' : '') + 'Image <span data-fancybox-index></span> of <span data-fancybox-count></span>';
        }
    });

});

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
