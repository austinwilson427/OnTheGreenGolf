using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public double Rating { get; set; }
        public int ChampPar { get; set; }
        public double ChampRating { get; set; }
        public int ChampSlope { get; set; }
        public int ChampYardage { get; set; }
        public int TournPar { get; set; }
        public double TournRating { get; set; }
        public int TournSlope { get; set; }
        public int TournYardage { get; set; }
        public int MembPar { get; set; }
        public double MembRating { get; set; }
        public int MembSlope { get; set; }
        public int MembYardage { get; set; }
        public int LadyPar { get; set; }
        public double LadyRating { get; set; }
        public int LadySlope { get; set; }
        public int LadyYardage { get; set; }
        public ICollection<TeeTime> TeeTimes { get; set; }
    }
}