using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string HomeCourse { get; set; }
        public int Handicap { get; set; }
        public int DrivingDistance { get; set; }
        public string PicUrl { get; set; }

    }
}