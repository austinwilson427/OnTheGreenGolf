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
    public class ProfileController : ApiController
    {
        private IGenericRepository _genRepo;

        public ProfileController(IGenericRepository genRepo)
        {
            _genRepo = genRepo;
        }

        //api/profile
        public IHttpActionResult GetProfiles()
        {
            var profileData = _genRepo.Query<Profile>();
            return Ok(profileData);
        }

        
        public IHttpActionResult getProfile(int id)
        {
            var profileData = _genRepo.Find<Profile>(id);
            return Ok(profileData);
        }

        [Route("api/profile/user/{userName}")]
        public IHttpActionResult getProfileByName(string userName)
        {
            var profileData = _genRepo.Query<Profile>().Where(p => p.UserName == userName).FirstOrDefault();
            return Ok(profileData);
        }

        public IHttpActionResult PostProfile(Profile profileToSave)
        {
            if (ModelState.IsValid)
            {
                
                if(profileToSave.Id == 0)
                {

                    _genRepo.Add<Profile>(profileToSave);
                    _genRepo.SaveChanges();
                    return Ok();

                }
                else
                {
                    var userProfile = _genRepo.Find<Profile>(profileToSave.Id);
                    userProfile.Birthday = profileToSave.Birthday;
                    userProfile.City = profileToSave.City;
                    userProfile.DrivingDistance = profileToSave.DrivingDistance;
                    userProfile.Email = profileToSave.Email;
                    userProfile.FirstName = profileToSave.FirstName;
                    userProfile.Handicap = profileToSave.Handicap;
                    userProfile.HomeCourse = profileToSave.HomeCourse;
                    userProfile.LastName = profileToSave.LastName;
                    userProfile.PicUrl = profileToSave.PicUrl;
                    userProfile.Sex = profileToSave.Sex;
                    userProfile.State = profileToSave.State;
                    userProfile.Zip = profileToSave.Zip;

                    _genRepo.SaveChanges();
                    return Ok();                    
                }

            }
            return BadRequest();
        }

        public IHttpActionResult DeleteProfile(int id)
        {
            _genRepo.Delete<Profile>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }
}
