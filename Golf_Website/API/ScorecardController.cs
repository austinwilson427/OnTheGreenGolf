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
    public class ScorecardController : ApiController
    {
        private IGenericRepository _genRepo;

        public ScorecardController(IGenericRepository genRepo)
        {

            _genRepo = genRepo;

        }

        //Sending to api/scorecard
        public IHttpActionResult GetAllScorecards()
        {
            var data = _genRepo.Query<Scorecard>();

            return Ok(data);

        }

        [Route("api/scorecard/user/{userName}")]
        public IHttpActionResult GetCartItemsByUser(string userName)
        {
            var cartData = _genRepo.Query<Scorecard>().Where(sc => sc.UserName == userName);
            return Ok(cartData);
        }

        [Route("api/scorecard/course/{courseId}")]
        public IHttpActionResult GetCartItemsByCourse(int courseId)
        {
            var cartData = _genRepo.Query<Scorecard>().Where(sc => sc.CourseId == courseId).FirstOrDefault();
            return Ok(cartData);
        }

        public IHttpActionResult PostScorecard(Scorecard scorecardToAdd)
        {
            if (ModelState.IsValid)
            {

                if (scorecardToAdd.Id == 0)
                {
                    scorecardToAdd.ScoreDate = DateTime.Now;
                    _genRepo.Add<Scorecard>(scorecardToAdd);
                    _genRepo.SaveChanges();
                    return Ok();
                }
                else
                {
                    var cardToEdit = _genRepo.Find<Scorecard>(scorecardToAdd.Id);

                    cardToEdit.MyDifficulty = scorecardToAdd.MyDifficulty;
                    cardToEdit.MyScore1 = scorecardToAdd.MyScore1;
                    cardToEdit.MyScore2 = scorecardToAdd.MyScore2;
                    cardToEdit.MyScore3 = scorecardToAdd.MyScore3;
                    cardToEdit.MyScore4 = scorecardToAdd.MyScore4;
                    cardToEdit.MyScore5 = scorecardToAdd.MyScore5;
                    cardToEdit.MyScore6 = scorecardToAdd.MyScore6;
                    cardToEdit.MyScore7 = scorecardToAdd.MyScore7;
                    cardToEdit.MyScore8 = scorecardToAdd.MyScore8;
                    cardToEdit.MyScore9 = scorecardToAdd.MyScore9;
                    cardToEdit.MyScore10 = scorecardToAdd.MyScore10;
                    cardToEdit.MyScore11 = scorecardToAdd.MyScore11;
                    cardToEdit.MyScore12 = scorecardToAdd.MyScore12;
                    cardToEdit.MyScore13 = scorecardToAdd.MyScore13;
                    cardToEdit.MyScore14 = scorecardToAdd.MyScore14;
                    cardToEdit.MyScore15 = scorecardToAdd.MyScore15;
                    cardToEdit.MyScore16 = scorecardToAdd.MyScore16;
                    cardToEdit.MyScore17 = scorecardToAdd.MyScore17;
                    cardToEdit.MyScore18 = scorecardToAdd.MyScore18;
                    cardToEdit.MyFront = scorecardToAdd.MyScore1 + scorecardToAdd.MyScore2 + scorecardToAdd.MyScore3 + scorecardToAdd.MyScore4 + scorecardToAdd.MyScore5 + scorecardToAdd.MyScore6 + scorecardToAdd.MyScore7 + scorecardToAdd.MyScore8 + scorecardToAdd.MyScore9;
                    cardToEdit.MyBack = scorecardToAdd.MyScore10 + scorecardToAdd.MyScore11 + scorecardToAdd.MyScore12 + scorecardToAdd.MyScore13 + scorecardToAdd.MyScore14 + scorecardToAdd.MyScore15 + scorecardToAdd.MyScore16 + scorecardToAdd.MyScore17 + scorecardToAdd.MyScore18;
                    cardToEdit.MyTotal = cardToEdit.MyFront + cardToEdit.MyBack;
                    cardToEdit.HandicapAdj = scorecardToAdd.HandicapAdj;
                    _genRepo.SaveChanges();
                    return Ok();

                }

            }

            return BadRequest();
        }

        public IHttpActionResult DeleteScorecard(int id)
        {
            _genRepo.Delete<Scorecard>(id);
            _genRepo.SaveChanges();
            return Ok();
        }
    }
}
