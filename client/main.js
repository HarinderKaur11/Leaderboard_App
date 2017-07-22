PlayersList=new Mongo.Collection("players");

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			var currentUserId= Meteor.userId();
			return PlayersList.find({createdBy: currentUserId},{sort: { score:-1 , name:1 }});
		},

		'selectedClass':function(){
			playerId=this._id;
			selectedPlayer=Session.get('selectedPlayer')
			if(playerId==selectedPlayer){
			return 'selected';
			}
		},

		'selectedPlayer': function(){
			var selectedPlayer=Session.get('selectedPlayer');
			return PlayersList.findOne({_id: selectedPlayer});
		}
	});

	Template.leaderboard.events({
		'click .player':function(){
			var playerId=this._id
			Session.set('selectedPlayer',playerId);
			var selectedPlayer=Session.get('selectedPlayer');
			
		},

		'click .increment':function(){
			var selectedPlayer=Session.get('selectedPlayer');
			PlayersList.update({_id: selectedPlayer},{$inc: {score:5}})
		},

		'click .decrement':function(){
			var selectedPlayer=Session.get('selectedPlayer');
			PlayersList.update({_id: selectedPlayer},{$inc: {score: -5}})
		},

		'click .remove':function(){
			var selectedPlayer=Session.get('selectedPlayer');
			var r=confirm("Are you sure you want to remove the player");
			if(r){
			PlayersList.remove({_id:selectedPlayer});
		}
		}
	});

	Template.addPlayerForm.events({
		'submit form':function(event){
			event.preventDefault();
			var playerNameVar=event.target.playerName.value;
			var initialScoreVar=event.target.initialScore.value;
			var intScore=parseInt(initialScoreVar);
			var currentUserId=Meteor.userId();
			console.log(playerNameVar);
			PlayersList.insert({
				name: playerNameVar,
				score: intScore,
				createdBy: currentUserId 
			});
			event.target.playerName.value="";
			event.target.initialScore.value="";
		}
	});
}


if(Meteor.isServer){
	
}