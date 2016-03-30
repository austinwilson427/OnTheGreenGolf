using Golf_Website.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Golf_Website.Repositories
{
    public class BookRepository : GenericRepository
    {
        private IGenericRepository _repo;
        private ApplicationDbContext _db = new ApplicationDbContext();

        public BookRepository(IGenericRepository repo)
        {
            _repo = repo;
        }


    }
}