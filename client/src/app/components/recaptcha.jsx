import ReCAPTCHA from "react-google-recaptcha";

export class Captcha extends React.Component {
    render() {
        return (
            <div className="recaptcha">
                <ReCAPTCHA
                    sitekey={'6LeH4CAUAAAAAOlUZMIB6EeE7Dv9FCNPedNFOGw8'}
                    onChange={this.props.input.onChange}
                />
            </div>
        )
    }

}