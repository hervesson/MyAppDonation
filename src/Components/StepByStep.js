import React from 'react'
import { View, Text, StyleSheet, Fragment } from 'react-native'

const StepByStep = (props) => {
	return (
		<>
		<View style={{flexDirection: 'row', justifyContent: "center", alignItems:"center", marginTop: 25}}>
			<View 
				style={{height: 30, 
					width: 30, 
					borderColor: props.corOne, 
					borderWidth: 2, 
					justifyContent: "center", 
					alignItems: "center", 
					borderRadius: 20
				}}>
				<Text>
					1
				</Text>
			</View>
			<View style={styles.separador} />
			<View 
				style={{height: 30, 
					width: 30, 
					borderColor: props.corTwo, 
					borderWidth: 2, 
					justifyContent: "center", 
					alignItems: "center", 
					borderRadius: 20
				}}>
				<Text>
					2
				</Text>
			</View>
			<View style={styles.separador} />
			<View 
				style={{height: 30, 
					width: 30, 
					borderColor: props.corThree, 
					borderWidth: 2, 
					justifyContent: "center", 
					alignItems: "center", 
					borderRadius: 20
				}}>
				<Text>
					3
				</Text>
			</View>
			<View style={styles.separador} />
			<View 
				style={{height: 30, 
					width: 30, 
					borderColor: props.corFour, 
					borderWidth: 2, 
					justifyContent: "center", 
					alignItems: "center", 
					borderRadius: 20
				}}>
				<Text>
					4
				</Text>
			</View>
		</View>
		</>
	)
}

const styles = StyleSheet.create({
	separador: {
		borderWidth: 0.5, 
		borderColor: '#A1A5AA', 
		width: 25,
		marginHorizontal: 10
	}
})

export default StepByStep