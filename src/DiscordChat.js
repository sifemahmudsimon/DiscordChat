import React, { useState } from 'react'
import './discordChat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHashtag, faVolumeHigh, faCircleUser, faMicrophoneSlash, faMicrophone, faHeadphones, faRss, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'

const DiscordChat = ({ data }) => {

    const Icon = (icon) => {
        return <FontAwesomeIcon icon={icon} />;
    }

    const [selectedItem, setselectedItem] = useState(null)


    const handleClick = (index) => {
        setselectedItem(index)
        console.log('Index:' + index);
    }

    return (
        <div className="discordchat">
            <div className="header"><h3>Chat Portal</h3></div>

            <div className="body">
                <div className="textbody">

                    <h5>{Icon(faAngleRight)} TEXT CHANNEL</h5>
                    <ul>
                        {data.map((DataType, index) => {
                            if (DataType.type === 'Text') {
                                return (
                                    <li key={index}>
                                        <div className="subheading">
                                            <div className="icon">
                                                {Icon(faHashtag)}
                                            </div>
                                            <div className="heading"><span>{DataType.name}</span></div>
                                            <div className="voicestatus">
                                                <div className="numbernotification">
                                                    <span>1</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </div>
                <div className="voicebody">

                    <h5>{Icon(faAngleRight)} VOICE CHANNEL</h5>
                    <ul>
                        {data.map((dataType, index) => {
                            if (dataType.type === 'Voice') {
                                console.log('Selected:' + selectedItem);
                                return (
                                    <li key={index}
                                        onClick={() => handleClick(index)}
                                        className={selectedItem === index ? 'active' : ''}
                                    >
                                        <div className='subheading' >
                                            <div className="icon">
                                                {Icon(faVolumeHigh)}
                                            </div>
                                            <div className="heading"><span> {dataType.name}</span></div>
                                        </div>
                                        {selectedItem === index && (
                                            <div className="user">
                                <ul>
                                    <li>
                                        <div className='subheading'>
                                            <div className="icon">
                                                {Icon(faCircleUser)}
                                            </div>
                                            <div className="heading"><span> Maze</span></div>
                                            <div className="voicestatus">{Icon(faMicrophoneSlash)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='subheading'>
                                            <div className="icon">
                                                {Icon(faCircleUser)}
                                            </div>
                                            <div className="heading"><span> Amanedail</span></div>
                                            <div className="voicestatus">
                                                <div className="iconrow">
                                                    <div className="icons">{Icon(faMicrophoneSlash)} </div>
                                                    <div className="icons">{Icon(faHeadphones)}</div>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                    <li>{Icon(faCircleUser)}<span> Lucifer</span></li>
                                </ul>
                            </div>
                                        )}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}

                        {/*  */}

                    </ul>
                </div>
            </div>
            <div className='footer'>
                <div className="footerbody">
                    <div className="connectionstatus">
                        <div className='subheading'>
                            <div className="icon">
                                {Icon(faRss)}
                            </div>
                            <div className="heading"><span>Voice Connected</span></div>
                            <div className="voicestatus">
                                <div className="iconrow">
                                    <div className="icons">{Icon(faPhoneSlash)} </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="userbar">
                        <div className='subheading'>
                            <div className="icon">
                                {Icon(faCircleUser)}
                            </div>
                            <div className="heading"><span>Lucifer</span></div>
                            <div className="voicestatus">
                                <div className="iconrow">
                                    <div className="icons">{Icon(faMicrophone)} </div>
                                    <div className="icons">{Icon(faHeadphones)}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscordChat