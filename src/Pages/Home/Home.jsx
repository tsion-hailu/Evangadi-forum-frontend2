import React, { useState, useEffect } from "react";
import axios from "../../API/axiosConfig";
import classes from "./home.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import QueAnsBox from "../../Components/QueAnsBox/QueAnsBox";
import LayOut from "../../Components/Layout/LayOut";
import Loader from "../../Components/Loader/Loader";
function Home() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        // API call: Fetch all questions
        const questionsResponse = await axios.get("/questions/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(questionsResponse.data?.questions || []);
        console.log("Questions:", questionsResponse.data?.questions || []);
        setIsLoadingPage(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoadingPage(false)
      }
    };

    fetchData();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
const handleQuestionClick = (singleQuestion) => {
  localStorage.setItem("selectedQuestion", JSON.stringify(singleQuestion));
};
  return (
    <LayOut>
      <div>
        <div className={classes.container}>
          <div className={classes.header}>
            <Link to="/questions">
              <button className={classes.ask__button}>Ask Question</button>
            </Link>
            <span className={classes.welcome}>
              Welcome:{" "}
              <span className={classes.username}>{user?.username}</span>
            </span>
          </div>
          <input
            type={classes.text}
            className={classes.search__bar}
            placeholder="search question"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Rendering filtered questions */}

          <div className={classes.question__list}>
            {isLoadingPage ? (
              <Loader />
            ) : (
              filteredQuestions.map((singleQuestion, i) => (
                <Link
                  key={i}
                  to={`/answer/${singleQuestion.question_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => handleQuestionClick(singleQuestion)}
                >
                  <QueAnsBox
                    content={false}
                    transition={true}
                    data={singleQuestion}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Home;
