using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace XmasParty.Controllers
{
    public class TeamsController : ApiController
    {
        static string filePath = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory) + @"\Party.json";


        private List<string> members = new List<string> { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N" };
        private List<string> teams = new List<string> { "ALPHA", "BETA", "GAMMA", "DELTA", "SIGMA", "OMEGA", "THETA" };
        private List<string> games = new List<string> { "Poker", "Bridge", "UNO", "Monopoly", "Blackjack", "Texas hold'em" };


        static List<Team> groups = new List<Team>();
        static string roundStatus = "";
        static Dictionary<string, List<Team>> dictRound1 = new Dictionary<string, List<Team>>();
        static Dictionary<string, List<Team>> dictRound2 = new Dictionary<string, List<Team>>();
        static Dictionary<string, List<Team>> dictRound3 = new Dictionary<string, List<Team>>();

        [HttpGet, Route("api/Teams")]
        public IHttpActionResult Teams()
        {
            return Ok(groups);
        }

        [HttpGet, Route("api/RandomGame")]
        public IHttpActionResult GetRandomGame()
        {
            var game = games.OrderBy(x => Guid.NewGuid()).Take(1);

            return Ok(game);
        }

        [HttpGet, Route("api/WinTeams")]
        public IHttpActionResult WinTeams(string round)
        {
            var winteams = new List<Team>();
            if (round == "1")
                winteams = groups.Where(x => x.round1win == true).ToList();
            if (round == "2")
                winteams = groups.Where(x => x.round2win == true).ToList();
            if (round == "3")
                winteams = groups.Where(x => x.round3win == true).ToList();

            if (winteams != null)
                return Ok(winteams);
            else
                return NotFound();
        }

        [HttpGet, Route("api/Alive")]
        public IHttpActionResult AliveTeams()
        {
            var alives = groups.Where(x => x.alive == true);
            return Ok(alives);
        }

        [HttpGet, Route("api/GetRound1Team")]
        public IHttpActionResult GetRound1Team()
        {
            return Ok(dictRound1);
        }

        [HttpGet, Route("api/GetRound2Team")]
        public IHttpActionResult GetRound2Team()
        {
            return Ok(dictRound2);
        }

        [HttpGet, Route("api/GetRound3Team")]
        public IHttpActionResult GetRound3Team()
        {
            return Ok(dictRound3);
        }


        [HttpPost, Route("api/RandomMember")]
        public IHttpActionResult RandomMember()
        {
            //groups.Clear();
            if (groups.Count() == 0)
            {
                var rndMemberList = members.OrderBy(x => Guid.NewGuid()).Take(members.Count).ToList();
                for (int i = 1; i <= teams.Count; i++)
                {
                    groups.Add(
                        new Team
                        {
                            id = i,
                            teamname = teams[i - 1],
                            member1 = rndMemberList[i * 2 - 2],
                            member2 = rndMemberList[i * 2 - 1]
                        });

                }

                File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
                return Ok(groups);
            }
            else
                return BadRequest();



        }


        [HttpPost, Route("api/Round1Team")]
        public IHttpActionResult Round1Team()
        {

            if (groups.Count != 0 && dictRound1.Count == 0)
            {
                //dictRound1.Clear();
                var rndTeam = groups.OrderBy(x => Guid.NewGuid()).Take(7).ToList();

                dictRound1.Add("1-1", new List<Team>() { rndTeam[0], rndTeam[1] });
                rndTeam[0].enemyTeamRound1 = rndTeam[1].teamname;
                rndTeam[0].round1group = "1-1";
                rndTeam[1].enemyTeamRound1 = rndTeam[0].teamname;
                rndTeam[1].round1group = "1-1";

                dictRound1.Add("1-2", new List<Team>() { rndTeam[2], rndTeam[3] });
                rndTeam[2].enemyTeamRound1 = rndTeam[3].teamname;
                rndTeam[2].round1group = "1-2";
                rndTeam[3].enemyTeamRound1 = rndTeam[2].teamname;
                rndTeam[3].round1group = "1-2";

                dictRound1.Add("1-3", new List<Team>() { rndTeam[4], rndTeam[5] });
                rndTeam[4].enemyTeamRound1 = rndTeam[5].teamname;
                rndTeam[4].round1group = "1-3";
                rndTeam[5].enemyTeamRound1 = rndTeam[4].teamname;
                rndTeam[5].round1group = "1-3";

                dictRound1.Add("SEED", new List<Team>() { rndTeam[6] });
                rndTeam[6].enemyTeamRound1 = "SEED";
                rndTeam[6].round1group = "SEED";
                rndTeam[6].round1win = true;

                roundStatus = "round1";
            }
            else
                return BadRequest();


            File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
            return Ok(dictRound1);
        }


        [HttpPut, Route("api/Round1Result")]
        public IHttpActionResult Round1Result(string round1game, string winTeamName)
        {
            var roundResult = new Dictionary<string, Team>();
            if (roundStatus == "round1")
            {
                var winTeam = groups.Where(x => x.teamname == winTeamName.ToUpper() && x.enemyTeamRound1 != "SEED").FirstOrDefault();
                if (winTeam != null)
                {
                    winTeam.round1game = round1game;
                    winTeam.round1win = true;
                    winTeam.alive = true;

                    groups.Remove(winTeam);
                    groups.Add(winTeam);
                    roundResult.Add(winTeam.round1group + " WINNER", winTeam);
                }
                else
                    return Ok("The inputed team is a seed team or not valid.");


                var loseTeam = groups.Where(x => x.enemyTeamRound1.Contains(winTeamName.ToUpper())).FirstOrDefault();
                if (loseTeam != null)
                {
                    loseTeam.round1game = round1game;
                    loseTeam.round1win = false;
                    loseTeam.alive = false;
                    groups.Remove(loseTeam);
                    groups.Add(loseTeam);
                    roundResult.Add(loseTeam.round1group + " LOSER", loseTeam);
                }
            }
            else
                return BadRequest();

            File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
            return Ok(roundResult);
        }


        [HttpPost, Route("api/Round2Team")]
        public IHttpActionResult Round2Team()
        {

            var alives = groups.Where(x => x.alive == true && x.round1win == true).ToList();
            if (alives.Count() == 4 && roundStatus == "round1")
            {
                //dictRound2.Clear();
                var rndTeam = alives.OrderBy(x => Guid.NewGuid()).Take(4).ToList();
                dictRound2.Add("2-1", new List<Team>() { rndTeam[0], rndTeam[1] });
                rndTeam[0].enemyTeamRound2 = rndTeam[1].teamname;
                rndTeam[0].round2group = "2-1";
                rndTeam[1].enemyTeamRound2 = rndTeam[0].teamname;
                rndTeam[1].round2group = "2-1";

                dictRound2.Add("2-2", new List<Team>() { rndTeam[2], rndTeam[3] });
                rndTeam[2].enemyTeamRound2 = rndTeam[3].teamname;
                rndTeam[2].round2group = "2-2";
                rndTeam[3].enemyTeamRound2 = rndTeam[2].teamname;
                rndTeam[3].round2group = "2-2";

                roundStatus = "round2";
            }
            else
                return BadRequest();


            File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
            return Ok(dictRound2);

        }


        [HttpPut, Route("api/Round2Result")]
        public IHttpActionResult Round2Result(string round2game, string winTeamName)
        {
            var roundResult = new Dictionary<string, Team>();
            if (roundStatus == "round2")
            {
                var winTeam = groups.Where(x => x.teamname.Contains(winTeamName.ToUpper()) && x.round1win == true).FirstOrDefault();
                if (winTeam != null)
                {
                    winTeam.round2game = round2game;
                    winTeam.round2win = true;
                    winTeam.alive = true;

                    groups.Remove(winTeam);
                    groups.Add(winTeam);
                    roundResult.Add(winTeam.round2group + " WINNER", winTeam);
                }
                else
                    return NotFound();

                var loseTeam = groups.Where(x => x.enemyTeamRound2.Contains(winTeamName.ToUpper()) && x.round1win == true).FirstOrDefault();
                if (loseTeam != null)
                {
                    loseTeam.round2game = round2game;
                    loseTeam.round2win = false;
                    loseTeam.alive = false;
                    groups.Remove(loseTeam);
                    groups.Add(loseTeam);
                    roundResult.Add(loseTeam.round2group + " LOSER", loseTeam);
                }
                else
                    return NotFound();



                if (groups.Where(x => x.alive == true && x.round1win == true && x.round2win == true).ToList().Count() == 2)
                {
                    var alives = groups.Where(x => x.alive == true).ToList();
                    var rndTeam = alives.OrderBy(x => Guid.NewGuid()).Take(2).ToList();
                    dictRound3.Add("3-1", new List<Team>() { rndTeam[0], rndTeam[1] });
                    rndTeam[0].enemyTeamRound3 = rndTeam[1].teamname;
                    rndTeam[0].round3group = "3-1";
                    rndTeam[1].enemyTeamRound3 = rndTeam[0].teamname;
                    rndTeam[1].round3group = "3-1";

                    roundStatus = "round3";
                }
            }
            else
                return BadRequest();

            File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
            return Ok(roundResult);
        }


        [HttpPut, Route("api/Round3Result")]
        public IHttpActionResult Round3Result(string round3game, string winTeamName)
        {
            var roundResult = new Dictionary<string, Team>();

            if (roundStatus == "round3")
            {
                var winTeam = groups.Where(x => x.teamname.Contains(winTeamName.ToUpper()) && x.round1win == true && x.round2win == true).FirstOrDefault();
                if (winTeam != null)
                {
                    winTeam.round3game = round3game;
                    winTeam.round3win = true;
                    winTeam.alive = true;

                    groups.Remove(winTeam);
                    groups.Add(winTeam);
                    roundResult.Add(winTeam.round3group + " WINNER", winTeam);
                }
                else
                    return NotFound();

                var loseTeam = groups.Where(x => x.enemyTeamRound3.Contains(winTeamName.ToUpper()) && x.round1win == true && x.round2win == true).FirstOrDefault();
                if (loseTeam != null)
                {
                    loseTeam.round3game = round3game;
                    loseTeam.round3win = false;
                    loseTeam.alive = false;
                    groups.Remove(loseTeam);
                    groups.Add(loseTeam);
                    roundResult.Add(loseTeam.round3group + " LOSER", loseTeam);
                }
            }
            else
                return BadRequest();

            File.WriteAllText(filePath, JsonConvert.SerializeObject(groups, Formatting.Indented));
            return Ok(roundResult);
        }

        [HttpPost, Route("api/ReadFile")]
        public IHttpActionResult ReadFile(List<Team> file)
        {
            groups = file;

            dictRound1.Clear();
            if (groups.Where(x => x.round1group == "1-1").ToList().Count != 0)
            {
                dictRound1.Add("1-1", groups.Where(x => x.round1group == "1-1").ToList());
                dictRound1.Add("1-2", groups.Where(x => x.round1group == "1-2").ToList());
                dictRound1.Add("1-3", groups.Where(x => x.round1group == "1-3").ToList());
                dictRound1.Add("SEED", groups.Where(x => x.round1group == "SEED").ToList());
            }

            dictRound2.Clear();
            if (groups.Where(x => x.round2group == "2-1").ToList().Count != 0)
            {
                dictRound2.Add("2-1", groups.Where(x => x.round2group == "2-1").ToList());
                dictRound2.Add("2-2", groups.Where(x => x.round2group == "2-2").ToList());
            }

            dictRound3.Clear();
            if (groups.Where(x => x.round3group == "3-1").ToList().Count != 0)
                dictRound3.Add("3-1", groups.Where(x => x.round3group == "3-1").ToList());

            if (dictRound1.Count != 0)
                roundStatus = "round1";
            if (dictRound2.Count != 0)
                roundStatus = "round2";
            if (dictRound3.Count != 0)
                roundStatus = "round3";
            if (dictRound1.Count == 0)
                roundStatus = "";


            return Ok(groups);

        }
    }
}