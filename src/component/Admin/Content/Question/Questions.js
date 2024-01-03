import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { CgAdd } from "react-icons/cg";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { HiMinusCircle } from "react-icons/hi";
import { LuBadgePlus } from "react-icons/lu";


export default function Questions() {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className="question-container">
            <div className="title">
                Manage Question
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>

                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className='mt-3'>
                    Add question:
                </div>

                <div>

                    <div className='question-content'>
                        <div className="form-floating description">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your quiz name"

                            />
                            <label>Descriptions</label>
                        </div>

                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type='file' hidden />
                            <span>0 file is upload</span>
                        </div>

                        <div className='btn-add'>
                            <span>
                                <CgAdd className='icon-add' />
                            </span>
                            <span>
                                <MdOutlineRemoveCircleOutline className='icon-remove' />
                            </span>
                        </div>
                    </div>

                    <div className='answer-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your quiz name"

                            />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <LuBadgePlus className='icon-add' />
                            </span>
                            <span>
                                <HiMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

