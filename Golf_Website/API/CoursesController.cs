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
    public class CoursesController : ApiController
    {
        private IGenericRepository _genRepo;

        public CoursesController(IGenericRepository genRepo)
        {
            _genRepo = genRepo;
        }

        //Adding all courses to /api/courses
        public IHttpActionResult GetAllCourses()
        {
            var courseData = _genRepo.Query<Course>();

            return Ok(courseData);
        }


        public IHttpActionResult GetOneCourse(int id)
        {
            var course = _genRepo.Find<Course>(id);
            return Ok(course);
        }
    }
}
