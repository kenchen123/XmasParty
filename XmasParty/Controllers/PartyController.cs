using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Web.Http.Cors;

namespace XmasParty.Controllers
{
    public class PartyController : ApiController
    {
        static string EmployeeFile = @"D:\Employees.json";
        static string MatchFile = @"D:\Matches.json";

        private List<string> teams = new List<string> { "A", "B", "C", "D", "E", "F", "S" };

        static List<Game> games = new List<Game> {
            new Game{ gamename="Switch"},
            new Game{ gamename="Foosball"}
        };

        static List<Employee> Employees = new List<Employee> {
            new Employee {id=1,name="Leo Chen" },
            new Employee {id=2,name="Jason Wu" },
            new Employee {id=3,name="Karen Chen" },
            new Employee {id=4,name="Esther Lin" },
            new Employee {id=5,name="Evan Lee" },
            new Employee {id=6,name="Jennifer Chen" },
            new Employee {id=7,name="Sandy Ho" },
            new Employee {id=8,name="Joy Lin" },
            new Employee {id=9,name="Weita Lu" },
            new Employee {id=10,name="Mabel Lin" },
            new Employee {id=11,name="Sharenna de la Cruz" },
            new Employee {id=12,name="Truman Huang" },
            new Employee {id=13,name="Yunming Liu" },
            new Employee {id=14,name="Ken Chen" }
        };

        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        [HttpGet, Route("api/GetEmp")]
        public List<Employee> GetEmp()
        {
            return JsonConvert.DeserializeObject<List<Employee>>(File.ReadAllText(EmployeeFile));
        }

        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        [HttpGet, Route("api/GetMatch")]
        public List<Match> GetMatch()
        {
            return JsonConvert.DeserializeObject<List<Match>>(File.ReadAllText(MatchFile));
        }

        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        [HttpPost, Route("api/RandomMember2")]
        public List<Employee> RandomMember(int seedid1, int seedid2)
        {
            if (!File.Exists(EmployeeFile))
            {
                using (FileStream fs = File.Create(EmployeeFile))
                {
                }
            }

            foreach (Employee emp in Employees)
                emp.seed = false;

            var seeds = Employees.Where(x => x.id == seedid1 || x.id == seedid2).ToList();
            foreach (Employee seed in seeds)
            {
                seed.seed = true;
                seed.team = "S";
            }

            var rndmembers = Employees.Where(x => x.seed == false).OrderBy(x => Guid.NewGuid()).ToList();
            for (int i = 1; i <= teams.Count - 1; i++)
            {
                rndmembers[i * 2 - 2].team = teams[i - 1];
                rndmembers[i * 2 - 1].team = teams[i - 1];
            }

            File.WriteAllText(EmployeeFile, JsonConvert.SerializeObject(Employees, Formatting.Indented));
            return Employees;
        }

        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        [HttpPost, Route("api/Match")]
        public List<Match> RandomMatch()
        {
            var employees = JsonConvert.DeserializeObject<List<Employee>>(File.ReadAllText(EmployeeFile));
            var rndteams = teams.Where(x => x != "S").OrderBy(x => Guid.NewGuid()).ToList();
            var Matches = new List<Match>();
            for (int i = 1; i < 4; i++)
            {
                var game = games.OrderBy(x => Guid.NewGuid()).Take(1).First().gamename;

                Matches.Add(new Match
                {
                    roundmatch = "G" + i.ToString(),
                    team1 = rndteams[i * 2 - 2],
                    team2 = rndteams[i * 2 - 1],
                    team1member1 = employees.Where(x => x.team == rndteams[i * 2 - 2]).Select(x => x.name).ToList()[0],
                    team1member2 = employees.Where(x => x.team == rndteams[i * 2 - 2]).Select(x => x.name).ToList()[1],
                    team2member1 = employees.Where(x => x.team == rndteams[i * 2 - 1]).Select(x => x.name).ToList()[0],
                    team2member2 = employees.Where(x => x.team == rndteams[i * 2 - 1]).Select(x => x.name).ToList()[1],
                    gamename = game
                });
            }
            File.WriteAllText(MatchFile, JsonConvert.SerializeObject(Matches, Formatting.Indented));
            return Matches;
        }

        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        [HttpPost, Route("api/R1")]
        public List<Match> R1Result(string winteam1, string winteam2, string winteam3)
        {
            var employees = JsonConvert.DeserializeObject<List<Employee>>(File.ReadAllText(EmployeeFile));

            var Matches = JsonConvert.DeserializeObject<List<Match>>(File.ReadAllText(MatchFile));
            if (Matches.Count != 3)
                Matches.RemoveAll(x => x.roundmatch == "G4" || x.roundmatch == "G5");

            if (Matches.Where(x => x.roundmatch == "G1" && (x.team1 == winteam1 || x.team2 == winteam1)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G1").First().winner = winteam1;
            if (Matches.Where(x => x.roundmatch == "G2" && (x.team1 == winteam2 || x.team2 == winteam2)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G2").First().winner = winteam2;
            if (Matches.Where(x => x.roundmatch == "G3" && (x.team1 == winteam3 || x.team2 == winteam3)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G3").First().winner = winteam3;
            Matches.Add(new Match
            {
                roundmatch = "G4",
                team1 = winteam1,
                team2 = winteam2,
                gamename = games.OrderBy(x => Guid.NewGuid()).Take(1).First().gamename,
                team1member1 = employees.Where(x => x.team == winteam1).Select(x => x.name).ToList()[0],
                team1member2 = employees.Where(x => x.team == winteam1).Select(x => x.name).ToList()[1],
                team2member1 = employees.Where(x => x.team == winteam2).Select(x => x.name).ToList()[0],
                team2member2 = employees.Where(x => x.team == winteam2).Select(x => x.name).ToList()[1]
            });
            Matches.Add(new Match
            {
                roundmatch = "G5",
                team1 = winteam3,
                team2 = "S",
                gamename = games.OrderBy(x => Guid.NewGuid()).Take(1).First().gamename,
                team1member1 = employees.Where(x => x.team == winteam3).Select(x => x.name).ToList()[0],
                team1member2 = employees.Where(x => x.team == winteam3).Select(x => x.name).ToList()[1],
                team2member1 = employees.Where(x => x.team == "S").Select(x => x.name).ToList()[0],
                team2member2 = employees.Where(x => x.team == "S").Select(x => x.name).ToList()[1]
            });

            File.WriteAllText(MatchFile, JsonConvert.SerializeObject(Matches, Formatting.Indented));
            return Matches;
        }

        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        [HttpPost, Route("api/R2")]
        public List<Match> R2Result(string winteam1, string winteam2)
        {
            var employees = JsonConvert.DeserializeObject<List<Employee>>(File.ReadAllText(EmployeeFile));
            var Matches = JsonConvert.DeserializeObject<List<Match>>(File.ReadAllText(MatchFile));
            if (Matches.Count != 5)
                Matches.RemoveAll(x => x.roundmatch == "G6");
            if (Matches.Where(x => x.roundmatch == "G4" && (x.team1 == winteam1 || x.team2 == winteam1)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G4").First().winner = winteam1;
            if (Matches.Where(x => x.roundmatch == "G5" && (x.team1 == winteam2 || x.team2 == winteam2)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G5").First().winner = winteam2;
            Matches.Add(new Match
            {
                roundmatch = "G6",
                team1 = winteam1,
                team2 = winteam2,
                gamename = games.OrderBy(x => Guid.NewGuid()).Take(1).First().gamename,
                team1member1 = employees.Where(x => x.team == winteam1).Select(x => x.name).ToList()[0],
                team1member2 = employees.Where(x => x.team == winteam1).Select(x => x.name).ToList()[1],
                team2member1 = employees.Where(x => x.team == winteam2).Select(x => x.name).ToList()[0],
                team2member2 = employees.Where(x => x.team == winteam2).Select(x => x.name).ToList()[1]
            });
            File.WriteAllText(MatchFile, JsonConvert.SerializeObject(Matches, Formatting.Indented));
            return Matches;
        }

        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        [HttpPost, Route("api/R3")]
        public List<Match> R3Result(string winteam1)
        {
            var Matches = JsonConvert.DeserializeObject<List<Match>>(File.ReadAllText(MatchFile));
            if (Matches.Where(x => x.roundmatch == "G6" && (x.team1 == winteam1 || x.team2 == winteam1)).Count() != 0)
                Matches.Where(x => x.roundmatch == "G6").First().winner = winteam1;
            File.WriteAllText(MatchFile, JsonConvert.SerializeObject(Matches, Formatting.Indented));
            return Matches;
        }
    }
}
