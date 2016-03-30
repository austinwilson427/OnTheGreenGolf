using Golf_Website.Models;
using Golf_Website.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Golf_Website.API
{
    public class ItemCountController : ApiController
    {
        private IGenericRepository _genRepo;

        public ItemCountController(IGenericRepository genRepo)
        {

            _genRepo = genRepo;

        }

        //Sending all cart data to /api/itemcount
        public IHttpActionResult GetItemCount()
        {
            var itemCountData = _genRepo.Query<ItemsInCart>();
            return Ok(itemCountData);
        }
    }
}
