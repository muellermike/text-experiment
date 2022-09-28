import "./AnswerForm.css";
import { Alert, Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useState } from "react";

function AnswerForm(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [answerTime, setAnswerTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    const answers = [
        { value: "left", name: "There are more dots on the left side.", payout: "(payout 0.5 Cents)" },
        { value: "right", name: "There are more dots on the right side.", payout: "(payout 5 Cents)" }
    ];
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(answer, (answerTime - startTime), (new Date() - startTime));
        setAnswered(false);
        setAnswer(initialAnswer);
        setStartTime(new Date());
    }

    // show form to input audio file
    return (
        <div>
            <Form className="vertical-center">
                <Form.Group className="mb-3" controlId="formBasicAudio">
                    <Form.Label>Please answer the question by writing either one of the two sentences (only those word written in <b>bold</b>).</Form.Label><br />
                    <ButtonGroup>
                        {answers.map((a, idx) => (
                        <ToggleButton
                            className="information-button"
                            disabled={true}
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={'outline-success'}
                            name="radio"
                            value={a.value}
                        >
                            <b>{a.name}</b> <br /> {a.payout}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                    <br />
                    <Form.Control
                        type="text"
                        value={answer}
                        disabled={isAnswered}
                        onChange={(e) => {
                            // TODO: check if this fits with other experiments
                            if(answer === initialAnswer) {
                                setAnswerTime(new Date());
                            }
                            setAnswer(e.currentTarget.value);
                            setAnswered(e.currentTarget.value.toLowerCase() === "there are more dots on the right side" || e.currentTarget.value.toLowerCase() === "there are more dots on the left side");
                        }} />
                    { isAnswered ? 
                    <Alert key={"success"} variant={"success"}>
                        <HiOutlineBadgeCheck size={"2em"} /> Successfully answered!
                    </Alert> : "" }
                </Form.Group>
                <Button variant="primary" disabled={!isAnswered} type="submit" onClick={handleSubmit}>
                    Play next round
                </Button>
            </Form>
            
        </div>
    )
}

export default AnswerForm;