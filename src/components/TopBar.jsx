import React from 'react';
import {
    topBarContainerStyles,
    databaseDropdownStyles,
    databaseNameStyles,
    dropdownIconStyles,
    userProfileContainerStyles,
    userProfileButtonStyles,
    userProfileTextStyles,
    userIconStyles,
} from './styles/TopBarStyles.js';

function TopBar({ databaseName = 'Marketing', userName = 'Fulano de tal' }) {
    return (
        <div style={topBarContainerStyles}>
            <div style={databaseDropdownStyles}>
                <span style={databaseNameStyles}>{databaseName}</span>
                <svg style={dropdownIconStyles} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M7 10L12 15L17 10"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div style={userProfileContainerStyles}>
                <button
                    style={userProfileButtonStyles}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9F9F9';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                >
                    <svg style={userIconStyles} viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="#0A0A0A" strokeWidth="1.33" />
                        <path
                            d="M3 13C3 10.7909 5.23858 9 8 9C10.7614 9 13 10.7909 13 13"
                            stroke="#0A0A0A"
                            strokeWidth="1.33"
                        />
                    </svg>
                    <span style={userProfileTextStyles}>{userName}</span>
                </button>
            </div>
        </div>
    );
}

export default TopBar;
