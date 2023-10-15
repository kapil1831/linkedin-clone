import React, { useRef, useState } from 'react'
import '../comps_styles/Editor.css'
import Button from './Button.js'
import EditorOption from './EditorOption'

import logo from './editor-logo-clipped.png';

import { Link, Image, FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered, ViewHeadline, Functions, Code, Terminal, HorizontalRule, FormatQuote, HMobiledata, DataObject, TextIncrease, TextDecrease, Widgets, Print, Close } from '@mui/icons-material';
import TagMenu from './TagMenu';
import ImageWrapper from './ImageWrapper';
import LinkInput from './LinkInput';

function TextSelectionTracker() {
    const [selectedText, setSelectedText] = useState('');

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            setSelectedText(selectedText);
        }
    };

    return (
        <div>
            <p onMouseUp={handleTextSelection}>
                Select some text in this paragraph to track the cursor position.
            </p>
            <div>
                <strong>Selected Text:</strong> {selectedText}
            </div>
        </div>
    );
}


const Editor = ({ onPostSubmit, onCancel }) => {
    // const [selection, setSelection] = useState('');
    // const [link, setLink] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLinkInputOpen, setIsLinkInputOpen] = useState(false);

    //data to submit
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [postImage, setPostImage] = useState(null);

    const [tags, setTags] = useState([{ name: 'C++', isSelected: true }, { name: 'Java', isSelected: false }, { name: 'Python', isSelected: false }, { name: 'Javascript', isSelected: true }, { name: 'String', isSelected: false }, { name: 'Array', isSelected: false }, { name: 'DP', isSelected: false }, { name: 'Hash Table', isSelected: false }, { name: 'Recursion', isSelected: false }, { name: 'Tree', isSelected: false }, { name: 'Graph', isSelected: false }]);

    const handleTagOnClick = (tagName) => {
        const modTags = tags.map(tag => {
            if (tag.name === tagName) {
                return { ...tag, isSelected: !tag.isSelected };
            }
            return tag;
        })

        setTags(modTags);

    }


    const [number, setNumber] = useState(3);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            // console.log(document.execCommand('insertHtML', true, selection));
            console.log(document.querySelector('#text-box').innerHTML, selection)
        }
    };

    const onBtnClick = (e, command, ui, value) => {
        // const cmd = e.target.type;
        // const eui = true;
        // const evalue = e.target.value;
        console.log(command, ui, value, typeof value);
        console.log(document.execCommand(command, true, value));
        console.log(document.querySelector('#text-box').innerHTML)
    }
    const onCreateLinkOkClick = (e, url) => {

        if (url) {
            if (url.includes('http') || url.includes('https')) {
                onBtnClick(e, 'createLink', true, url)
            } else {
                onBtnClick(e, 'createLink', true, 'https://' + url);
            }
            setIsLinkInputOpen(!isLinkInputOpen);
        } else {
            alert('please provide valid link');
        }
    }

    const onBodyClick = (e) => {
        if (isMenuOpen && e.target.classList.contains('tag-menu-wrapper') === false) {
            setIsMenuOpen(!isMenuOpen);
        }
    }

    const onSubmit = (e) => {
        onPostSubmit(e, {
            file,
            title,
            content,
            tags: tags.filter(tag => tag.isSelected)
        })

        onCancel();
    }

    return (
        <div className='overlay' area-hidden='true' >
            <div className='editor-bg' onClick={(e) => { }}>
                <div className='logo'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='editor'>
                    {/* Editor top */}
                    <div className='editor-header'>
                        <input type='text' maxLength={100} placeholder='Enter your title' onChange={(e) => setTitle(e.target.value)} />
                        <div className='editor-header-buttons'>
                            <Button name='Cancel' onClick={() => {
                                const body = document.querySelector('.app__body');

                                body.classList.toggle('noscroll', false);

                                onCancel()
                                console.log('return to previous page');
                            }} />
                            <Button name='Post' backgroundColor='#2cbb5d' onClick={(e) => onSubmit(e)} />
                        </div>
                    </div>

                    {/* Tags */}
                    {/* <div className='tags'>

                        <div onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                        }} className='add-tag-btn'><span className='add-sign'>+</span> Tag</div>
                        <span className='selected-tags'>
                            {
                                tags.filter((tag) => tag.isSelected).map((tag, index) => {

                                    return <div key={index} className='tag'> {tag.name} <span onClick={() => handleTagOnClick(tag.name)
                                    }> <Close /> </span></div>
                                })
                            }
                        </span>
                    </div> */}

                    {/* Editor options */}
                    <div className='editor-options'>
                        <div>
                            <EditorOption type='increase font size' Icon={TextIncrease} onClick={(e) => {
                                let modNumber = number < 7 ? number + 1 : (number);
                                setNumber(modNumber);
                                onBtnClick(e, 'fontSize', true, modNumber)
                            }} />

                            <EditorOption type='decrease font size' Icon={TextDecrease} onClick={(e) => {
                                let modNumber = number > 1 ? number - 1 : (number);
                                setNumber(modNumber);
                                onBtnClick(e, 'fontSize', true, modNumber)
                            }} />

                            <EditorOption type='bold' onClick={(e) => onBtnClick(e, 'bold', true, null)} Icon={FormatBold} value={null} />

                            <EditorOption type='italic' onClick={(e) => onBtnClick(e, 'italic', true, null)} Icon={FormatItalic} value={null} />

                            <EditorOption type='underline' onClick={(e) => onBtnClick(e, 'underline', true, null)} Icon={FormatUnderlined} value={null} />
                        </div>
                        <span className='option-saperator'>|</span>
                        <div>
                            <EditorOption type='insertOrderedList' Icon={FormatListNumbered} onClick={(e) => onBtnClick(e, 'insertOrderedList', true, null)} />

                            <EditorOption type='insertUnorderedList' Icon={FormatListBulleted} onClick={(e) => onBtnClick(e, 'insertUnorderedList', true, null)} />

                            <EditorOption type='insertHorizontalRule' name='divider' Icon={HorizontalRule} value={null} onClick={(e) => onBtnClick(e, 'insertHorizontalRule', true, null)} />
                        </div>
                        <span className='option-saperator'>|</span>
                        <div>
                            {/* <EditorOption type='formatBlock' name='mixed-code-block' Icon={Terminal} />
                    <EditorOption type='formatBlock' name='code-block' Icon={Code} />
                    <EditorOption type='formatBlock' name='inline-code-block' Icon={DataObject} />
                    <EditorOption type='latex' Icon={Functions} />
                    <span className='option-saperator'>|</span> */}
                            <label htmlFor='upload-image'>
                                <EditorOption type='insertImage' Icon={Image} />
                            </label>
                            <input type='file' id='upload-image'
                                onClick={(e) => e.target.value = null}
                                onChange={(e) => {
                                    const types = ['image/png', 'image/jpeg'];
                                    const selected = e.target.files[0];
                                    if (selected && types.includes(selected.type)) {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(selected);
                                        reader.onload = () => {
                                            setPostImage(reader.result);
                                        }
                                        setFile(selected);
                                        console.log(selected);
                                    } else {
                                        setFile(null);
                                        setPostImage(null);
                                        console.log('no file selected');
                                    }
                                }} />

                            <EditorOption type='createLink' Icon={Link} onClick={(e) => {

                                // setIsLinkInputOpen(!isLinkInputOpen);
                                const url = prompt('Enter Link :');
                                if (url) {
                                    if (url.includes('http') || url.includes('https')) {
                                        onBtnClick(e, 'createLink', true, url)
                                    } else {
                                        onBtnClick(e, 'createLink', true, 'https://' + url);
                                    }
                                } else {
                                    alert('please provide valid link');
                                }

                            }
                            } />

                            <EditorOption type='quote' Icon={FormatQuote} />
                            <EditorOption type='print' Icon={Print} onClick={() => handleTextSelection()} />
                        </div>
                    </div>
                    {/* text input area */}
                    <div className='text-box-wrapper' >
                        {/* <TextSelectionTracker  /> */}
                        <div id='text-box' className='text-box' contentEditable={true}
                            onInput={(e) => setContent(e.target.innerHTML)}>
                        </div>
                    </div>

                    {/* tags menu */}
                    {isMenuOpen && <TagMenu tags={tags} handleTagOnClick={handleTagOnClick} handleOutsideMenuClick={() => setIsMenuOpen(!isMenuOpen)} />}

                    {/* link input box */}
                    {isLinkInputOpen && <LinkInput onSubmit={onCreateLinkOkClick} />}

                    {/* Image wrapper */}
                    {postImage && <ImageWrapper postImage={postImage} clearImage={() => {
                        setPostImage(null)
                        setFile(null);
                    }
                    } />}
                </div>
            </div>
        </div>
    )
}

export default Editor
