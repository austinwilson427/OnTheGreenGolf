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
    public class CartController : ApiController
    {
        private IGenericRepository _genRepo;

        public CartController(IGenericRepository genRepo)
        {

            _genRepo = genRepo;

        }

        //Sending all cart data to /api/cart
        public IHttpActionResult GetCartItems()
        {
            var user = User.Identity as ClaimsIdentity;

            if (!user.HasClaim("Admin", "true"))
            {
                return Unauthorized();
            }
            var cartData = _genRepo.Query<CartItem>();
            return Ok(cartData);
        }

        [Route("api/cart/{userName}")]
        public IHttpActionResult GetCartItemsByUser(string userName)
        {
            var cartData = _genRepo.Query<CartItem>().Where(ci => ci.UserName == userName);
            return Ok(cartData);
        }

        public IHttpActionResult PostCartItem(CartItem itemToAdd)
        {
            if (ModelState.IsValid)
            {

                if (itemToAdd.Id == 0)
                {
                    _genRepo.Add<CartItem>(itemToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var itemToEdit = _genRepo.Find<CartItem>(itemToAdd.Id);
                    //itemToEdit.ItemName = itemToAdd.ItemName;
                    //itemToEdit.OrderDate = itemToEdit.OrderDate;
                    //itemToEdit.Price = itemToAdd.Price;
                    //itemToEdit.ProdId = itemToAdd.ProdId;

                    //Only allowing the editing of quantity on an item by user
                    itemToEdit.Quantity = itemToAdd.Quantity;
                    itemToEdit.isSubmitted = itemToAdd.isSubmitted;
                    _genRepo.SaveChanges();
                    return Ok();

                }

            }

            return BadRequest();

        }

        public IHttpActionResult DeleteItem(int id)
        {
            _genRepo.Delete<CartItem>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }
}
