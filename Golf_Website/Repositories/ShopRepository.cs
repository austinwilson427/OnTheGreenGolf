using Golf_Website.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Repositories
{
    public class ShopRepository : GenericRepository, IShopRepository
    {
        private IGenericRepository _repo;
        private ApplicationDbContext _db = new ApplicationDbContext();

        public ShopRepository(IGenericRepository repo)
        {
            _repo = repo;
        }

        public void DeleteProduct(int id)
        {
            _repo.Delete<Product>(id);
            _repo.SaveChanges();

        }


    }
}