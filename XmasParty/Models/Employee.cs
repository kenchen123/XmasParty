using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace XmasParty
{
    public class Employee
    {
        public int id { get; set; }
        public string name { get; set; }
        public string team { get; set; }
        public bool seed { get; set; }

        /*  @using Newtonsoft.Json;
    @{
        var EmployeeFile = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory) + @"\Employees.json";
        var employees = JsonConvert.DeserializeObject<List<Employee>>(File.ReadAllText(EmployeeFile));
        var members = employees.Where(x => x.team == ).Select(x => x.name).ToList();
        var member1 = members[0];
        var member2 = members[1];
    }*/
    }

    public class Match
    {
        public string roundmatch { get; set; }
        public string team1 { get; set; }
        public string team2 { get; set; }
        public string gamename { get; set; }
        public string winner { get; set; }

        public string team1member1 { get; set; }
        public string team1member2 { get; set; }
        public string team2member1 { get; set; }
        public string team2member2 { get; set; }
    }

    public class Game
    {
        public string gamename { get; set; }
        public string gametype { get; set; }
    }
}