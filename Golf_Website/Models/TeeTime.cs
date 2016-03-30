using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class TeeTime
    {
        public int Id { get; set; }
        public DateTime ResTime { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public int AHandicap { get; set; }
        public string APic { get; set; }
        public int BHandicap { get; set; }
        public string BPic { get; set; }
        public int CHandicap { get; set; }
        public string CPic { get; set; }
        public int DHandicap { get; set; }
        public string DPic { get; set; }

        public int? CourseId { get; set; }
    }
}