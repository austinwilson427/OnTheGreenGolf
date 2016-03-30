using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class Friendship
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FriendId { get; set; }

    }
}