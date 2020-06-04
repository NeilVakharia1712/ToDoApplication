import React from "react";
import { Button } from '@material-ui/core';
import { signInWithGoogle } from '../../utils/FirebaseAuthUtils';
import './Startup.css'
import '../../App.css'

const Startup = () => {
	return (
		<div className="startup-background">
			<div className="content">
				<div style={{ textAlign: 'center' }}>
					<span className='FinishIt' style={{ fontSize: '40px'}}>
						FINISH IT
        	</span>
					<span className='Pro' style={{ fontSize: '40px'}}>
						__NOW
        	</span>
				</div>
				<div style ={{textAlign: "center"}}>
					<img src='icontry.png' alt='logo' style={{height: "40%", width: "40%",mixBlendMode: 'multiply' }}></img>
				</div>

				<Button
					variant="contained"
					type="submit"
					style={{ background: '#67A6FC', marginTop: '100px', color: 'white', width: '30%', marginLeft: '35%' }}
					onClick={signInWithGoogle}
				>
					Sign In
      	</Button>
			</div>
		</div>
	);
}

export {Startup}