using Golf_Website.Models;
using Golf_Website.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Golf_Website.API
{
    public class ShopController : ApiController
    {
        private IGenericRepository _genRepo;
        private IShopRepository _shopRepo;
        public ShopController(IGenericRepository genRepo, IShopRepository shopRepo)
        {
            _genRepo = genRepo;
            _shopRepo = shopRepo;
        }

        //Getting all items to shop. 'api/shop'
        public IHttpActionResult GetAllShopItems()
        {
            var shopData = _genRepo.Query<Product>();
            return Ok(shopData);
        }

        //Getting all types to shop
        [Route("api/shop/{type}")]
        public IHttpActionResult GetAllDrivers(string type)
        {
            var driverData = _genRepo.Query<Product>().Where(i => i.Type == type);
            return Ok(driverData);
        }

        //Getting each id listed to type 
        [Route("api/shop/{type}/{id}")]
        public IHttpActionResult GetEachDriver(int id, string type)
        {
            var eachDriverData = _genRepo.Query<Product>().Where(i => i.Type == type && i.Id == id).FirstOrDefault();
            return Ok(eachDriverData);

        }

        //Saving item
        public IHttpActionResult PostProduct(Product productToAdd)
        {
            var user = User.Identity as ClaimsIdentity;

            if (!user.HasClaim("Admin", "true"))
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                //Creating a new product
                if (productToAdd.Id == 0)
                {
                    _genRepo.Add<Product>(productToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    //updating if product already exists
                    var originalProduct = _genRepo.Find<Product>(productToAdd.Id);
                    originalProduct.ProdId = productToAdd.ProdId;
                    originalProduct.Category = productToAdd.Category;
                    originalProduct.FileName = productToAdd.FileName;
                    originalProduct.Make = productToAdd.Make;
                    originalProduct.Type = productToAdd.Type;
                    originalProduct.ShortDesc = productToAdd.ShortDesc;
                    originalProduct.Price = productToAdd.Price;

                    _genRepo.SaveChanges();
                    return Ok(productToAdd);
                }
            }//End of model state validation
            return BadRequest();
        }//End of PostProduct action

        //Deleting Item
        [Route("api/shop/{type}/{id}")]
        public IHttpActionResult DeleteProduct(int id, string type)
        {
            var user = User.Identity as ClaimsIdentity;

            if (!user.HasClaim("Admin", "true"))
            {
                return Unauthorized();
            }

            _shopRepo.DeleteProduct(id);
            return Ok();
        }//End of DeleteProduct action
    }
}
