function RandomMember(formObj) {
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

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);

            var jobj = JSON.parse(this.responseText);
            var seeds = jobj.filter(function (e) { return e.seed == true; });
            document.getElementById("R141member1").innerHTML = seeds[0].name;
            document.getElementById("R141member2").innerHTML = seeds[1].name;

            //var R1S = document.getElementById('R1S');
            //var G0name = document.getElementById('G0name');
           
            //fadeIn(document.getElementById('R1S'));
            //fadeIn(document.getElementById('G0name'));
            $(document).ready(function () {
         
                $(document.getElementById("R1S")).css('visibility', 'visible').hide().fadeIn(2000);
                $(document.getElementById("G0name")).css('visibility', 'visible').hide().fadeIn(2000);
            });
            
            //document.getElementById("R1S").hidden = "";
            //document.getElementById("G0name").hidden = "";
        }
    };

    xhttp.open("POST", "api/RandomMember2?seedid1=" + selected[0] + "&seedid2=" + selected[1], true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");

}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}



function RandomMatch() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);

            document.getElementById("matchse").play();

            sleep(4000).then(() => {
                // 这里写sleep之后需要去做的事情

                var jobj = JSON.parse(this.responseText);

                document.getElementById("G1name").innerHTML = jobj[0].gamename;
                document.getElementById("G2name").innerHTML = jobj[1].gamename;
                document.getElementById("G3name").innerHTML = jobj[2].gamename;

                document.getElementById("G11teaminput").value = jobj[0].team1;
                document.getElementById("G12teaminput").value = jobj[0].team2;
                document.getElementById("G21teaminput").value = jobj[1].team1;
                document.getElementById("G22teaminput").value = jobj[1].team2;
                document.getElementById("G31teaminput").value = jobj[2].team1;
                document.getElementById("G32teaminput").value = jobj[2].team2;

                //document.getElementById("G11team").innerHTML = jobj[0].team1;
                //document.getElementById("G12team").innerHTML = jobj[0].team2;
                //document.getElementById("G21team").innerHTML = jobj[1].team1;
                //document.getElementById("G22team").innerHTML = jobj[1].team2;
                //document.getElementById("G31team").innerHTML = jobj[2].team1;
                //document.getElementById("G32team").innerHTML = jobj[2].team2;

                document.getElementById("G11team").src = "/image/" + jobj[0].team1 + ".gif";
                document.getElementById("G12team").src = "/image/" + jobj[0].team2 + ".gif";
                document.getElementById("G21team").src = "/image/" + jobj[1].team1 + ".gif";
                document.getElementById("G22team").src = "/image/" + jobj[1].team2 + ".gif";
                document.getElementById("G31team").src = "/image/" + jobj[2].team1 + ".gif";
                document.getElementById("G32team").src = "/image/" + jobj[2].team2 + ".gif";

                //document.getElementById("R1").hidden = "";
                //document.getElementById("R1Game").hidden = "";
                //fadeIn(document.getElementById('R1'));
                //fadeIn(document.getElementById('R1Game'));

                document.getElementById("G11member1").innerHTML = jobj[0].team1member1;
                document.getElementById("G11member2").innerHTML = jobj[0].team1member2;
                document.getElementById("G12member1").innerHTML = jobj[0].team2member1;
                document.getElementById("G12member2").innerHTML = jobj[0].team2member2;
                document.getElementById("G21member1").innerHTML = jobj[1].team1member1;
                document.getElementById("G21member2").innerHTML = jobj[1].team1member2;
                document.getElementById("G22member1").innerHTML = jobj[1].team2member1;
                document.getElementById("G22member2").innerHTML = jobj[1].team2member2;
                document.getElementById("G31member1").innerHTML = jobj[2].team1member1;
                document.getElementById("G31member2").innerHTML = jobj[2].team1member2;
                document.getElementById("G32member1").innerHTML = jobj[2].team2member1;
                document.getElementById("G32member2").innerHTML = jobj[2].team2member2;

                $(document).ready(function () {
                    $(document.getElementById("R1-1")).css('visibility', 'visible').hide().fadeIn(3000, "linear");
                    $(document.getElementById("G11team")).animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G12team")).animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G11team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("G12team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("R1-2")).css('visibility', 'visible').delay("2000").hide().fadeIn(3000, "linear");
                    $(document.getElementById("G21team")).delay("2000").animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G22team")).delay("2000").animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G21team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("G22team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("R1-3")).css('visibility', 'visible').delay("4000").hide().fadeIn(3000, "linear");
                    $(document.getElementById("G31team")).delay("4000").animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G32team")).delay("4000").animate({ height: "300px", width: "300px" }, "slow");
                    $(document.getElementById("G31team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("G32team")).animate({ height: "70px", width: "70px" }, "slow");
                    $(document.getElementById("R1btn")).css('visibility', 'visible').delay("4000").hide().fadeIn(3000, "linear");
                    
                    //$(document.getElementById("R1")).css('visibility', 'visible').hide().fadeIn(3000, "linear");
                    $(document.getElementById("G1name")).css('visibility', 'visible').hide().fadeIn(3000, "linear");
                    $(document.getElementById("G2name")).css('visibility', 'visible').hide().delay("2000").fadeIn(3000, "linear");
                    $(document.getElementById("G3name")).css('visibility', 'visible').hide().delay("4000").fadeIn(3000, "linear");

                });
            })
        }
    };
    xhttp.open("POST", "api/Match", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");

}

function SaveR1result(formObj) {
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


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);

            var jobj = JSON.parse(this.responseText);

            document.getElementById("G4name").innerHTML = jobj[3].gamename;
            document.getElementById("G5name").innerHTML = jobj[4].gamename;


            document.getElementById("G41teaminput").value = jobj[0].winner;
            document.getElementById("G42teaminput").value = jobj[1].winner;
            document.getElementById("G51teaminput").value = jobj[2].winner;

            //document.getElementById("G41team").innerHTML = jobj[0].winner;
            //document.getElementById("G42team").innerHTML = jobj[1].winner;
            //document.getElementById("G51team").innerHTML = jobj[2].winner;
            document.getElementById("G41team").src = "/image/" + jobj[0].winner + ".gif";
            document.getElementById("G42team").src = "/image/" + jobj[1].winner + ".gif";
            document.getElementById("G51team").src = "/image/" + jobj[2].winner + ".gif";
            //document.getElementById("G52team").src = "/image/S.gif";
            //document.getElementById("R2").hidden = "";
            //document.getElementById("R2Game").hidden = "";
            $(document).ready(function () {
                $(document.getElementById("R2")).css('visibility', 'visible').hide().fadeIn(2000);
                $(document.getElementById("R2Game")).css('visibility', 'visible').hide().fadeIn(2000);
            });
           
        }
    };
    xhttp.open("POST", "api/R1?winteam1=" + selected1[0] + "&winteam2=" + selected2[0] + "&winteam3=" + selected3[0], true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}

function SaveR2result(formObj) {
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

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);

            var jobj = JSON.parse(this.responseText);
            document.getElementById("G6name").innerHTML = jobj[5].gamename;

            document.getElementById("G61teaminput").value = jobj[3].winner;
            document.getElementById("G62teaminput").value = jobj[4].winner;


            //document.getElementById("G61team").innerHTML = jobj[3].winner;
            //document.getElementById("G62team").innerHTML = jobj[4].winner;
            document.getElementById("G61team").src = "/image/" + jobj[3].winner + ".gif";
            document.getElementById("G62team").src = "/image/" + jobj[4].winner + ".gif";

            //document.getElementById("R3").hidden = "";
            //document.getElementById("R3Game").hidden = "";
            $(document).ready(function () {
                $(document.getElementById("R3")).css('visibility', 'visible').hide().fadeIn(2000);
                $(document.getElementById("R3Game")).css('visibility', 'visible').hide().fadeIn(2000);
            });

        }
    };
    xhttp.open("POST", "api/R2?winteam1=" + selected1[0] + "&winteam2=" + selected2[0], true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}

function SaveR3result(formObj) {
    var obj = formObj.R31winner;
    var selected = [];
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            selected.push(obj[i].value);
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);

            var jobj = JSON.parse(this.responseText);

            //document.getElementById("winner").innerHTML = "Winner:"+jobj[5].winner;
            document.getElementById("winner").src = "/image/" + jobj[5].winner + ".gif";
            //document.getElementById("final").hidden = "";

            document.getElementById("gamblegod").play();
            $(document).ready(function () {
                $(document.getElementById("final")).css('visibility', 'visible').hide().fadeIn(2000);
            });
        }
    };
    xhttp.open("POST", "api/R3?winteam1=" + selected[0], true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}

function GetEmp() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("GET", "api/GetEmp", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function WinnerStyle() {
    if (document.getElementById("G11teaminput").checked) {
        document.getElementById("G11team").style.color = "red";
        document.getElementById("G12team").style.color = "black";
    }

    if (document.getElementById("G12teaminput").checked) {
        document.getElementById("G11team").style.color = "black";
        document.getElementById("G12team").style.color = "red";
    }

    if (document.getElementById("G21teaminput").checked) {
        document.getElementById("G21team").style.color = "red";
        document.getElementById("G22team").style.color = "black";
    }

    if (document.getElementById("G22teaminput").checked) {
        document.getElementById("G21team").style.color = "black";
        document.getElementById("G22team").style.color = "red";
    }

    if (document.getElementById("G31teaminput").checked) {
        document.getElementById("G31team").style.color = "red";
        document.getElementById("G32team").style.color = "black";
    }

    if (document.getElementById("G32teaminput").checked) {
        document.getElementById("G31team").style.color = "black";
        document.getElementById("G32team").style.color = "red";
    }

    if (document.getElementById("G41teaminput").checked) {
        document.getElementById("G41team").style.color = "red";
        document.getElementById("G42team").style.color = "black";
    }

    if (document.getElementById("G42teaminput").checked) {
        document.getElementById("G41team").style.color = "black";
        document.getElementById("G42team").style.color = "red";
    }

    if (document.getElementById("G51teaminput").checked) {
        document.getElementById("G51team").style.color = "red";
        document.getElementById("G52team").style.color = "black";
    }

    if (document.getElementById("G52teaminput").checked) {
        document.getElementById("G51team").style.color = "black";
        document.getElementById("G52team").style.color = "red";
    }

    if (document.getElementById("G61teaminput").checked) {
        document.getElementById("G61team").style.color = "red";
        document.getElementById("G62team").style.color = "black";
    }

    if (document.getElementById("G62teaminput").checked) {
        document.getElementById("G61team").style.color = "black";
        document.getElementById("G62team").style.color = "red";
    }
}

