import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../API/axiosConfig";
import { AuthContext } from "../../App";
import QueAnsBox from "../../Components/QueAnsBox/QueAnsBox";
import classes from "./answer.module.css";
import LayOut from "../../Components/Layout/LayOut";
import Error from "../../Components/Error/Error";
import Loader from "../../Components/Loader/Loader";

function Answer() {
  const [answer, setAnswer] = useState("");
  const [ans, setAns] = useState(null);
  const [answerError, setAnswerError] = useState("");
  const [newAnswer, setNewAnswer] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const storedQuestion = JSON.parse(localStorage.getItem("selectedQuestion"));
  const question = storedQuestion || null;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  console.log(question);

  useEffect(() => {
    const getAnswer = async () => {
      setIsLoadingPage(true);
      try {
        const token = localStorage.getItem("token"); // Safely access localStorage

        const { data: answerData } = await axios.get(`/answer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(answerData.answers);

        setAns(answerData.answers);
        setIsLoadingPage(false);
      } catch (error) {
        // alert("internal server error12");
        setIsLoadingPage(false);
      }
    };
    getAnswer();
  }, [newAnswer, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    setAnswerError("");
    if (!answer) {
      setAnswerError("Answer is required.");
      isValid = false;
    } else if (answer.length < 5) {
      setAnswerError("answer must be at least 5 characters long!");
      isValid = false;
    }
    if (!isValid) return;
    const answerData = {
      userid: user.userid,
      questionid: id,
      answer: answer,
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.post("/answer/postAnswers", answerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("posted successfully");
      setAnswer("");
      setNewAnswer(!newAnswer);
      setIsLoading(false);
    } catch (error) {
      alert("internal server error");
      setAnswer("");
      setIsLoading(false);
    }
  };

  return (
    <LayOut>
      <section className={classes.outerContainer}>
        <div>
          <div>
            <h2>Question</h2>

            <div>
              <div className={classes.icon_container}>
                <i className={`fas fa-arrow-circle-right ${classes.icon}`}></i>

                <span className={classes.titleSpan}>{question.title}</span>
              </div>

              <div className={classes.line}></div>
            </div>
            <p>{question.content}</p>
            <h2 className={classes.answerBorder}>Answer From The Community </h2>
            {isLoadingPage ? (
              <Loader color="red" />
            ) : ans ? (
              <div>
                {ans.map((answer, i) => (
                  <QueAnsBox
                    content={true}
                    key={i}
                    transition={false}
                    data={answer}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", margin: "50px 0" }}>
                Be the first to answer this question!
              </div>
            )}
          </div>
        </div>
        <h2 className={classes.topAnswer}>Answer The Top Question</h2>
        <div className={classes.goToQuestion}>
          <Link to="/home">Go to question page</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="content"
              name="content"
              value={answer}
              className={classes.textarea}
              rows="15"
              cols="109"
              placeholder="your answer"
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <br />
            {answerError && <Error message={answerError} />}
            <br />
            <button type="submit">
              {isLoading ? <Loader /> : "Post Answer"}{" "}
            </button>
          </div>
        </form>
      </section>
    </LayOut>
  );
}

export default Answer;
