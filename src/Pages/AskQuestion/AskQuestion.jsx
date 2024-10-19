import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./askQuestion.module.css";
import axios from "../../API/axiosConfig";
import LayOut from "../../Components/Layout/LayOut";
import Error from "../../Components/Error/Error";
import Loader from "../../Components/Loader/Loader";

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    setQuestionError("");
    setContentError("");

    if (!question) {
      setQuestionError("Title is required.");
      isValid = false;
    } else if (question.length < 5) {
      setQuestionError("Title must be at least 5 characters long!");
      isValid = false;
    }
    if (!content) {
      setContentError("Content is required!");
      isValid = false;
    } else if (content.length < 10) {
      setContentError("Content must be at least 10 characters long!");
      isValid = false;
    }

    if (!isValid) return;

    const questionData = {
      title: question,
      description: content,
      tag: tag,
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios.post("/questions/question", questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/home");
      setIsLoading(false);
    } catch (error) {
      alert(" internal server error");
      setQuestion("");
      setContent("");
      console.log(error);
    }
  };

  return (
    <LayOut>
      <section className={classes.qwrapper}>
        <div className={classes.firstContainer}>
          <div className={classes.mainTitle}>
            <h2>Steps To Write A Good Question</h2>
            <div className={classes.qline}></div>
          </div>
          <div className={classes.summary}>
            <ul>
              <div>
                <i className="fas fa-arrow-circle-right"></i> Summarize your
                problem in one-line title.
              </div>
            </ul>
            <ul>
              <div>
                <i className="fas fa-arrow-circle-right"></i> Describe your
                problem in more detail
              </div>
            </ul>
            <ul>
              <div>
                <i className="fas fa-arrow-circle-right"></i> Describe what you
                tried and what you expected to happen
              </div>
            </ul>
            <ul>
              <div>
                <i className="fas fa-arrow-circle-right"></i> Review your
                question and post it
              </div>
            </ul>
          </div>
          <h1 className={classes.title}>Ask a public question</h1>
          <h1 className={classes.title1}>Post Your Question</h1>
          <div className={classes.goToQuestion}>
            <Link to="/home">Go to question page</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Question title"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {questionError && <Error message={questionError} />}
            <br />
            <br />
            <textarea
              id="content"
              name="content"
              value={content}
              className={classes.textarea}
              rows="12"
              placeholder="Describe your question in detail..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {contentError && <Error message={contentError} />}
            <br />
            Tag
            <select
              id="options"
              name="options"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="" disabled></option>
              <option value="javascript">Javascript</option>
              <option value="html">HTML</option>
              <option value="node">Node</option>
              <option value="css">CSS</option>
              <option value="react">React</option>
              <option value="mysql">MySQL</option>
            </select>
            <br />
            <button type="submit">
              {isLoading ? <Loader /> : "Post Your Question"}{" "}
            </button>
          </div>
        </form>
      </section>
    </LayOut>
  );
}

export default AskQuestion;
