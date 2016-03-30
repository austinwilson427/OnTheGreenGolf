using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Quantity { get; set; }
        public string ItemName { get; set; }
        public string ProdId { get; set; }
        public decimal Price { get; set; }
        public DateTime OrderDate { get; set; }
        public bool isSubmitted { get; set; }
    }
}