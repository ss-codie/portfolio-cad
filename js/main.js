Portfolio = {

};

Portfolio.ProjectSections = {
    sections: {
        'professional-project-1': true,
        'professional-project-2': true,
        'professional-project-3': true,
        'professional-project-4': true,
        'professional-project-5': true,
        'professional-project-6': true,
        'professional-project-7': true,
        'professional-project-8': true,
        'professional-project-9': true,
        'professional-project-10': true,
        'professional-project-11': true,
        'professional-project-12': true,
        'personal-project-1': true,
        'personal-project-2': true,
        'personal-project-3': true,
        'personal-project-4': true,
    }
};

Portfolio.Consts = {
    DEBUG: 1
};

Portfolio.UI = {
    isTouchEnabled: false,

    bindPage: function() {
        Portfolio.UI.isTouchEnabled =  !!('ontouchstart' in window || navigator.maxTouchPoints); 
        if (!Portfolio.UI.isTouchEnabled) {
            $('.work-header p').hide();
        }
    }
};

Portfolio.Events = {
    bindEvents: function () {
        try {
            $(".project-front").on('transitionend', Portfolio.Events.onProjectFrontTransitionend);
            $(".project-back").mouseleave(Portfolio.Events.onProjectBackMouseLeave);
        }
        catch (ex) {
            Portfolio.Helper.logError(ex);
        }
    },

    onProjectFrontTransitionend: function(e) {
        let parents = $(e.target).parents();
        if (parents) {
            const projectSectionNames = Object.keys(Portfolio.ProjectSections.sections);
            for (let i = 0; i < projectSectionNames.length; ++i) {
                const projectSectionName = projectSectionNames[i];
                if (parents.hasClass(projectSectionName)) {
                    $(`.${projectSectionName} .project-front`).css('opacity', 0);
                    $(`.${projectSectionName} .project-back`).removeClass("hidden");
                }
            }
        }
    },

    onProjectBackMouseLeave: function (e) {
        let parents = $(e.target).parents();
        if (parents) {
            const projectSectionNames = Object.keys(Portfolio.ProjectSections.sections);            
            for (let i = 0; i < projectSectionNames.length; ++i) {
                const projectSectionName = projectSectionNames[i];
                if (parents.hasClass(projectSectionName)) {
                    $(`.${projectSectionName} .project-back`).addClass("hidden");
                    $(`.${projectSectionName} .project-front`).css('opacity', 1);
                }
            }
        }
    }
};

Portfolio.Helper = {
    logError(ex) {
        if (Portfolio.Consts.DEBUG === 1) {
            return;
        }
        console.log(ex);
    }
};

$(document).ready(function () {
    Portfolio.UI.bindPage();

    Portfolio.Events.bindEvents();
})
