import React from "react";
import Event from './Event';

const Calendar = () => {
    return (
        <div className="Calendar">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="time">8am</td>
                        <Event event="Yoga" location="Park" color="green" />
                        <Event event="Coffee" location="Cafe" color="blue" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event="Gym" location="Club" color="pink" />
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">9am</td>
                        <Event event="Meeting" location="Office" color="pink" />
                        <td></td>
                        <Event event="Groceries" location="Store" color="green" />
                        <td></td>
                        <td></td>
                        <Event event="Study" location="Library" color="blue" />
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">10am</td>
                        <Event event="Doctor" location="Clinic" color="pink" />
                        <td></td>
                        <Event event="Brunch" location="Diner" color="green" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">11am</td>
                        <td></td>
                        <Event event="Call" location="Home" color="blue" />
                        <td></td>
                        <td></td>
                        <Event event="Read" location="Home" color="green" />
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">12pm</td>
                        <Event event="Lunch" location="Cafe" color="pink" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event="Work" location="Office" color="blue" />
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">1pm</td>
                        <td></td>
                        <Event event="Review" location="Room A" color="pink" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event="Nap" location="Home" color="green" />
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">2pm</td>
                        <Event event="Workshop" location="Hall" color="blue" />
                        <td></td>
                        <Event event="Coffee" location="Shop" color="pink" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">3pm</td>
                        <td></td>
                        <Event event="Plan" location="Room B" color="green" />
                        <td></td>
                        <Event event="Walk" location="Trail" color="blue" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">4pm</td>
                        <Event event="Dentist" location="Clinic" color="pink" />
                        <td></td>
                        <td></td>
                        <Event event="Cook" location="School" color="green" />
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="time">5pm</td>
                        <Event event="Run" location="Track" color="blue" />
                        <td></td>
                        <td></td>
                        <td></td>
                        <Event event="Dinner" location="Grill" color="pink" />
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
