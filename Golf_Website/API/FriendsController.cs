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
    public class FriendsController : ApiController
    {
        private IGenericRepository _genRepo;

        public FriendsController(IGenericRepository genRepo)
        {
            _genRepo = genRepo;
        }

        // api/friends
        public IHttpActionResult GetFriends()
        {
            var user = User.Identity as ClaimsIdentity;
            var friendshipData = _genRepo.Query<Friendship>();

            return Ok(friendshipData);
        }

        // Get friends by userId
        [Route("api/confirmed/{friendId}")]
        public IHttpActionResult GetFriendsByUserId(int friendId)
        {
            var friendshipData = _genRepo.Query<Friendship>().Where(f => f.FriendId == friendId);

            return Ok(friendshipData);
        }

        [Route("api/requested/{userId}")]
        public IHttpActionResult GetFriendsByUserIdAndFriendId(int userId)
        {
            var friendshipData = _genRepo.Query<Friendship>().Where(f => f.UserId == userId);

            return Ok(friendshipData);
        }

        public IHttpActionResult PostFriendship(Friendship friendshipToAdd)
        {

            if (ModelState.IsValid)
            {

                if(friendshipToAdd.Id == 0)
                {
                    _genRepo.Add<Friendship>(friendshipToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }

                
            }

            return BadRequest();
        }

        public IHttpActionResult DeleteFriendship(int id)
        {
            _genRepo.Delete<Friendship>(id);
            return Ok();
        }
    }
}
