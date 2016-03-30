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
    public class BookingController : ApiController
    {
        private IGenericRepository _genRepo;

        private ApplicationDbContext _db = new ApplicationDbContext();

        public BookingController(IGenericRepository genRepo)
        {
            _genRepo = genRepo;

        }

        //Adding all bookings to /api/booking
        public IHttpActionResult GetAllBookings()
        {
            var bookingData = _genRepo.Query<TeeTime>();
            return Ok(bookingData);
        }


        [Route("api/booking/{courseId}")]
        public IHttpActionResult GetCourseTimes(int courseId)
        {
            var courseTeeTimeData = _genRepo.Query<TeeTime>().Where(t => t.CourseId == courseId);
            return Ok(courseTeeTimeData);
        }

        [Route("api/booking/{courseId}/{id}")]
        public IHttpActionResult GetEachTimeForEachCourse(int id, int courseId)
        {
            var eachTeeTimeData = _genRepo.Query<TeeTime>().Where(t => t.CourseId == courseId && t.Id == id).FirstOrDefault();
            return Ok(eachTeeTimeData);

        }

        public IHttpActionResult PostProduct(TeeTime teeTimeToAdd)
        {
            if (ModelState.IsValid)
            {
                //Creating a new product
                if (teeTimeToAdd.Id == 0)
                {
                    _genRepo.Add<TeeTime>(teeTimeToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    //updating if product already exists
                    var originalTeeTime = _genRepo.Find<TeeTime>(teeTimeToAdd.Id);
                    originalTeeTime.CourseId = teeTimeToAdd.CourseId;
                    originalTeeTime.ResTime = teeTimeToAdd.ResTime;
                    if (teeTimeToAdd.A != null)
                    {
                        originalTeeTime.A = teeTimeToAdd.A;
                        originalTeeTime.AHandicap = teeTimeToAdd.AHandicap;
                        originalTeeTime.APic = teeTimeToAdd.APic;
                    }
                    if (teeTimeToAdd.B != null)
                    {
                        originalTeeTime.B = teeTimeToAdd.B;
                        originalTeeTime.BHandicap = teeTimeToAdd.BHandicap;
                        originalTeeTime.BPic = teeTimeToAdd.BPic;
                    }
                    if (teeTimeToAdd.C != null)
                    {
                        originalTeeTime.C = teeTimeToAdd.C;
                        originalTeeTime.CHandicap = teeTimeToAdd.CHandicap;
                        originalTeeTime.CPic = teeTimeToAdd.CPic;
                    }
                    if (teeTimeToAdd.D != null)
                    {
                        originalTeeTime.D = teeTimeToAdd.D;
                        originalTeeTime.DHandicap = teeTimeToAdd.DHandicap;
                        originalTeeTime.DPic = teeTimeToAdd.DPic;
                    }

                    _genRepo.SaveChanges();
                    return Ok(teeTimeToAdd);
                }
            }//End of model state validation
            return BadRequest();
        }
    }
}
