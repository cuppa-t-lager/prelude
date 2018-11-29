var ProjectFiles = function(jobID, projectID) {
	this.jobID = jobID;
	this.projectID = projectID;
}

ProjectFiles.prototype.syncFilesToLocalStorage = function() {
	this.getFiles(this.saveToLocalStorage);
}

ProjectFiles.prototype.getFiles = function(callback) {

	var req = $.ajax({
		url: "/core/root/ajax.cfc?method=goJSON&logicalComponent=jobManagement.JobManagement&logicalMethod=getProjectFiles",
		data: {
			jobID: this.jobID,
			projectID: this.projectID
		}
	});

	req.done(function(data) {
		var projectFileIDs = data;
		if(projectFileIDs.length) {
			callback(data);
		}
	});

}

ProjectFiles.prototype.clearLocalStorage = function() {
	localStorage.removeItem('manage.ProjectFilesCollection');
}

ProjectFiles.prototype.saveToLocalStorage = function(ids) {
	localStorage.setItem('manage.ProjectFilesCollection', ids);
}

ProjectFiles.showPopup = function(href) {
	window.open(href, "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbar=yes,resizable=yes,copyhistory=yes,width=900,height=700");
}