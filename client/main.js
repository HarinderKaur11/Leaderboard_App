PlayersList=new Mongo.Collection("players");

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return PlayersList.find({},{sort: { score:-1 , name:1 }});
		},

		'selectedClass':function(){
			playerId=this._id;
			selectedPlayer=Session.get('selectedPlayer')
			if(playerId==selectedPlayer){
			return 'selected';
			}
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
		}
	});
}


if(Meteor.isServer){
	
}