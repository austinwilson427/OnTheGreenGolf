using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Golf_Website.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string ProdId { get; set; }

        public string Category { get; set; }

        public string FileName { get; set; }

        public string Make { get; set; }

        public string Type { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string ShortDesc { get; set; }

        public decimal Price { get; set; }

        public double Rating { get; set; }

        
    }
}