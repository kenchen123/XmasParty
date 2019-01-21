namespace XmasParty
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Team")]
    public partial class Team
    {
        public int id { get; set; }

        public string teamname { get; set; }
        public string member1 { get; set; }
        public string member2 { get; set; }
        public bool alive { get; set; } = true;
        public bool round1win { get; set; }
        public bool round2win { get; set; }
        public bool round3win { get; set; }


        public string enemyTeamRound1 { get; set; } = "";
        public string enemyTeamRound2 { get; set; } = "";
        public string enemyTeamRound3 { get; set; } = "";
        public string round1game { get; set; }
        public string round2game { get; set; }
        public string round3game { get; set; }
        public string round1group { get; set; }
        public string round2group { get; set; }
        public string round3group { get; set; }
    }
}
