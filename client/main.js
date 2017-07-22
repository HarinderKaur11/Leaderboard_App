PlayersList=new Mongo.Collection("players");

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return 'player helper function';
		},
		'secondhelper': function(){
			return 'second helper function';
		}
	});
}
if(Meteor.isServer){
	
}